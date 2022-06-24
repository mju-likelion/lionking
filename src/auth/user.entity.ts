import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 10, nullable: true })
  nickname: string;

  @ApiProperty()
  @Column({ length: 5, nullable: true })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  password: string;

  @ApiProperty()
  @Column({ length: 30, nullable: true })
  email: string;

  @ApiProperty()
  @CreateDateColumn()
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => Memos, memo => memo.user)
  memo: Memos[];

  @OneToOne(() => UserLounges, UserLounge => UserLounge.user)
  user: UserLounges[];
}
