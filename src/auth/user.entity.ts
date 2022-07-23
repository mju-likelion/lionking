import { ApiProperty } from '@nestjs/swagger';
import { Memo } from 'src/memo/memo.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

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
  @Column({ nullable: true, select: false })
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

  @OneToMany(() => Memo, memo => memo.user)
  memos: Memo[];

  @OneToMany(() => Room, room => room.user)
  rooms: Room[];

  @ApiProperty()
  @Column({ nullable: true })
  password1: string;
}
