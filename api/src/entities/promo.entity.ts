import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class PromoCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Service, (service) => service.promoCodes, {
    onDelete: 'CASCADE',
  })
  service: Service;
}
