import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization as string;
    try {
      const decoded = this.authService.verify(token.split(' ')[1]);
      const { user } = await this.authService.findById(decoded['id']);
      req['user'] = user;
    } catch (e) {}
    next();
  }
}
