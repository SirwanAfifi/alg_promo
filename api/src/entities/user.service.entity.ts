import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';
import { User } from './user.entity';

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
