import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { PromoCode } from './promo.entity';
import { User } from './user.entity';
import { UserService } from './user.service.entity';

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
