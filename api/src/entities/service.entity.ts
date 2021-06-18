import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PromoCode } from './promo.entity';
import { UserService } from './_index';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => PromoCode, (promoCode) => promoCode.service)
  promoCodes: PromoCode[];

  @OneToMany(() => UserService, (userService) => userService.service)
  userServices!: UserService[];
}
