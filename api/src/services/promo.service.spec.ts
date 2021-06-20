import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PromoCode, User, UserService } from 'src/entities/_index';
import { PromoCodeService } from 'src/services/_index';
import { Repository } from 'typeorm';

const mockRepository = () => ({
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
});

const mockPromoCodeService = {
  createPromoCode: jest.fn(),
  activateBounce: jest.fn(),
};

type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PromoService', () => {
  let promoCodeService: PromoCodeService;
  let promoCodeRepository: MockRepository<PromoCode>;
  let userRepository: MockRepository<UserService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(PromoCode),
          useValue: mockRepository(),
        },
        {
          provide: PromoCodeService,
          useValue: mockPromoCodeService,
        },
      ],
    }).compile();

    promoCodeService = module.get<PromoCodeService>(PromoCodeService);
    userRepository = module.get(getRepositoryToken(User));
    promoCodeRepository = module.get(getRepositoryToken(PromoCode));
  });

  it('be defined', () => {
    expect(promoCodeService).toBeDefined();
  });

  describe('createPromoCode', () => {
    const createPromoCodeArgs = {
      description: '',
      serviceId: -1,
      percentage: -1,
      activeFrom: new Date(),
      activeTo: new Date(),
    };

    it('should fail when serviceId is -1', async () => {
      expect(createPromoCodeArgs.serviceId).not.toBe(-1);
    });

    it('should fail when activeFrom and activeTo are equal', async () => {
      expect(createPromoCodeArgs.activeFrom.getTime()).not.toBe(
        createPromoCodeArgs.activeTo.getTime(),
      );
    });
  });
});
