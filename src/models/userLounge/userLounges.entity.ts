import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Lounges } from '../lounges/lounges.entity';
import { Users } from '../users/user.entity';

@Entity()
export class UserLounges {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: true })
  loungeName: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Users, user => user.id)
  user: Users;

  @ManyToOne(() => Lounges, lounge => lounge.id)
  lounge: Lounges;
}
