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

import { Memos } from '../memo/memos.entity';
import { Room } from '../room/room.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 11, nullable: true })
  phone: string;

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

  @OneToOne(() => Room, room => room.user)
  user: Room[];

  @ApiProperty()
  @Column({ nullable: true })
  password1: string;
}
