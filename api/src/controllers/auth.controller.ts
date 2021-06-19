import { Body, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { LoginDto } from 'src/dtos/_index';
import { AuthService } from 'src/services/_index';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
