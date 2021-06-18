import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User, Service } from './_index';

@Entity()
export class UserService {
  @PrimaryGeneratedColumn()
  userServiceId!: number;

  @Column()
  userId!: number;

  @Column()
  serviceId!: number;

  @ManyToOne(() => User, (user) => user.userServices)
  user!: User;

  @ManyToOne(() => Service, (service) => service.userServices)
  service!: Service;
}
