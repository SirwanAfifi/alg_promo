import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatePromoCodeDto } from 'src/dtos/create-promo-code.dto';
import { ActivateBounceDto } from 'src/dtos/_index';
import { User } from 'src/entities/_index';
import { PromoCodeService } from 'src/services/_index';
import { AuthUser } from 'src/utils/auth.decorator';
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

  @Post('/activateBounce')
  @HttpCode(HttpStatus.OK)
  activateBounce(
    @Body() activateBounceDto: ActivateBounceDto,
    @AuthUser() user: User,
  ) {
    return this.promoCodeService.activateBounce(activateBounceDto, user.id);
  }
}
