import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateServiceDto } from 'src/dtos/create-service-dto';
import { ServiceService } from 'src/services/_index';
import { AuthGuard } from 'src/utils/auth.guard';

@Controller('api/service')
@UseGuards(AuthGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.createService(createServiceDto);
  }
}
