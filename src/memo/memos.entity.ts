import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../auth/user.entity';

@Entity()
export class Memos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: true })
  title: string;

  @Column({ length: 1000, nullable: true })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.id)
  user: User;
}
