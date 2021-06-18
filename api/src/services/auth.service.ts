import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  doWork = () => 'Do Work';
}
