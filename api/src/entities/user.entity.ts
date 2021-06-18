import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Service } from './service.entity';
import { UserService } from './user.service.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  balance: number;

  @OneToMany(() => UserService, (userService) => userService.user)
  userServices!: UserService[];
}
