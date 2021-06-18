import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePromoCodeDto } from 'src/dtos/_index';
import { PromoCode } from 'src/entities/_index';
import { Repository } from 'typeorm';

@Injectable()
export class PromoCodeService {
  constructor(
    @InjectRepository(PromoCode)
    private readonly promoCodes: Repository<PromoCode>,
  ) {}

  async createPromoCode({ description, serviceId }: CreatePromoCodeDto) {
    try {
      const promoCode = await this.promoCodes.save(
        this.promoCodes.create({
          description,
          serviceId,
        }),
      );
      return { ok: true, data: promoCode };
    } catch (error) {
      return { ok: false, error: "Couldn't create promo code" };
    }
  }
}
