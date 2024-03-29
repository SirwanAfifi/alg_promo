import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { LoginDto, SignupDto } from 'src/dtos/_index';
import { User } from 'src/entities/_index';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createAccount({
    username,
    password,
  }: SignupDto): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ username });
      if (exists) {
        return { ok: false, error: 'User exists in the DB' };
      }
      await this.users.save(
        this.users.create({
          username,
          password,
        }),
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({ username, password }: LoginDto): Promise<{
    ok: boolean;
    error?: string;
    token?: string;
    userInfo?: {
      userId: number;
      username: string;
      balance: number;
    };
  }> {
    try {
      const user = await this.users.findOne(
        { username },
        { select: ['id', 'password', 'balance', 'username'] },
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
        userInfo: {
          userId: user.id,
          balance: user.balance,
          username: user.username,
        },
      };
    } catch (error) {
      return { ok: false, error: "Can't login user" };
    }
  }

  verifyToken(token: string) {
    try {
      jwt.verify(
        token.split(' ')[1],
        this.configService.get<string>('PRIVATE_KEY'),
        {
          ignoreExpiration: true,
        },
      );
      return true;
    } catch {
      return false;
    }
  }

  verify(token: string) {
    return jwt.verify(token, this.configService.get<string>('PRIVATE_KEY'));
  }

  async findById(id: number) {
    try {
      const user = await this.users.findOneOrFail({ id });
      return { ok: true, user };
    } catch (error) {
      return { ok: false, error: 'User not found.' };
    }
  }
}
