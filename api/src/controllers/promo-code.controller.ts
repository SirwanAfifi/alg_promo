import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatePromoCodeDto } from 'src/dtos/create-promo-code.dto';
import { PromoCodeService } from 'src/services/_index';
import { AuthGuard } from 'src/utils/auth.guard';

@Controller('api/promoCode')
@UseGuards(AuthGuard)
export class PromoCodeController {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createPromoCodeDto: CreatePromoCodeDto) {
    return this.promoCodeService.createPromoCode(createPromoCodeDto);
  }
}
