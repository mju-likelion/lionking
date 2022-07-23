import { Room } from 'src/room/room.entity';
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
export class Memo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: true })
  title: string;

  @Column({ length: 1000, nullable: true })
  content: string;

  @ManyToOne(() => User, user => user.memos)
  user: User;

  @ManyToOne(() => Room, room => room.memos)
  room: Room;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
