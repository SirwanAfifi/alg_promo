import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreatePromoCodeDto } from 'src/dtos/create-promo-code.dto';
import { PromoCodeService } from 'src/services/_index';

@Controller('api/promoCode')
export class PromoCodeController {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createPromoCodeDto: CreatePromoCodeDto) {
    return this.promoCodeService.createPromoCode(createPromoCodeDto);
  }
}
