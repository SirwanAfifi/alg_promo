import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';
import { join } from 'path';
import {
  AuthService,
  CommonService,
  ServiceService,
  PromoCodeService,
} from './services/_index';
import { PromoCode, User } from './entities/_index';
import {
  CommonController,
  ServiceController,
  PromoCodeController,
} from './controllers/_index';
import { Service } from './entities/_index';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Service, PromoCode, User]),
  ],
  controllers: [CommonController, ServiceController, PromoCodeController],
  providers: [AuthService, CommonService, ServiceService, PromoCodeService],
})
export class AppModule {}
