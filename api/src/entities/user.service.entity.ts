import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User, Service, PromoCode } from './_index';

@Entity()
export class UserService {
  @PrimaryGeneratedColumn()
  userServiceId!: number;

  @Column()
  userId!: number;

  @Column()
  serviceId!: number;

  @Column()
  promoCodeId!: number;

  @ManyToOne(() => PromoCode, (promoCode) => promoCode.userServices)
  promoCode: PromoCode;

  @ManyToOne(() => User, (user) => user.userServices)
  user!: User;

  @ManyToOne(() => Service, (service) => service.userServices)
  service!: Service;
}
