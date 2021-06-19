import { INestApplication } from '@nestjs/common';
import * as faker from 'faker';
import { Service } from 'src/entities/_index';
import {
  AuthService,
  PromoCodeService,
  ServiceService,
} from 'src/services/_index';

const getRange = (length: number) =>
  Array.from({ length }, (_, index) => index);

export const seeder = async (app: INestApplication) => {
  const service = app.get<ServiceService>('ServiceService');
  const promoCodeService = app.get<PromoCodeService>('PromoCodeService');
  const authService = app.get<AuthService>('AuthService');

  const userResult = await authService.createAccount({
    username: 'Sirwan',
    password: 'SAMPLE',
  });

  if (!userResult.ok) return;

  for (const _ of getRange(100)) {
    const savedService = await service.createService({
      title: faker.company.companyName(),
      price: +faker.commerce.price(),
      description: faker.commerce.productDescription(),
    });

    if (!savedService.ok) {
      continue;
    }

    const savedServiceData = savedService.data as Service;
    for (const _ of getRange(10)) {
      await promoCodeService.createPromoCode({
        description: faker.commerce.productDescription(),
        serviceId: savedServiceData.id,
        percentage: faker.datatype.number({ min: 5, max: 30 }),
        activeFrom: faker.date.recent(),
        activeTo: faker.date.between(faker.date.recent(), '2021-12-12'),
      });
    }
  }
};
