import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import * as uuid from 'uuid';
import { Service } from './_index';

@Entity()
export class PromoCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  percentage: number;

  @Column()
  activeFrom: Date;

  @Column()
  activeTo: Date;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Service, (service) => service.promoCodes, {
    onDelete: 'CASCADE',
  })
  service: Service;

  @Column()
  serviceId!: number;

  @BeforeInsert()
  createCode() {
    this.code = uuid.v4();
  }
}
