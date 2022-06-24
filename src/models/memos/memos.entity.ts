import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Users } from '../../auth/user.entity';

@Entity()
export class Memos {
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

  @ManyToOne(() => Users, user => user.id)
  user: Users;
}
