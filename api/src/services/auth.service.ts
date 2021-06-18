import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { LoginDto } from 'src/dtos/_index';
import { User } from 'src/entities/_index';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  sign(payload: Record<string, unknown>): string {
    return jwt.sign(payload, this.configService.get<string>('PRIVATE_KEY'));
  }

  async login({
    username,
    password,
  }: LoginDto): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne(
        { username },
        { select: ['id', 'password'] },
      );
      if (!user) {
        return { ok: false, error: 'User not found' };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return { ok: false, error: 'Wrong password' };
      }
      const token = jwt.sign(
        { id: user.id },
        this.configService.get<string>('PRIVATE_KEY'),
      );
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return { ok: false, error: "Can't login user" };
    }
  }
}
