import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivateBounceDto, CreatePromoCodeDto } from 'src/dtos/_index';
import { PromoCode, UserService } from 'src/entities/_index';
import { Repository } from 'typeorm';

@Injectable()
export class PromoCodeService {
  constructor(
    @InjectRepository(PromoCode)
    private readonly promoCodes: Repository<PromoCode>,
    @InjectRepository(UserService)
    private readonly userServices: Repository<UserService>,
  ) {}

  async createPromoCode(input: CreatePromoCodeDto) {
    try {
      const promoCode = await this.promoCodes.save(
        this.promoCodes.create(input),
      );
      return { ok: true, data: promoCode };
    } catch (error) {
      return { ok: false, error: "Couldn't create promo code" };
    }
  }

  async activateBounce(activateBounceDto: ActivateBounceDto, userId: number) {
    try {
      const foundPromoCode = await this.promoCodes.findOne({
        where: {
          code: activateBounceDto.promoCode,
          serviceId: activateBounceDto.serviceId,
        },
      });
      if (!foundPromoCode) {
        throw new Error();
      }

      await this.userServices.save(
        this.userServices.create({
          userId,
          serviceId: activateBounceDto.serviceId,
          promoCodeId: foundPromoCode.id,
        }),
      );

      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false, error: 'The given code is not valid' };
    }
  }
}
