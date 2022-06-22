import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { Memos } from '../models/memos/memos.entity';
import { UserLounges } from '../models/userLounge/userLounges.entity';

@Entity()
@Unique(['nickname'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10, nullable: true })
  nickname: string;

  @Column({ length: 5, nullable: true })
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ length: 30, nullable: true })
  email: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => Memos, memo => memo.user)
  memo: Memos[];

  @OneToOne(() => UserLounges, UserLounge => UserLounge.user)
  user: UserLounges[];
}
