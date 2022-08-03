import { User } from 'src/auth/user.entity';
import { Lounge } from 'src/lounge/lounges.entity';
import { Memo } from 'src/memo/memo.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['admin'])
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  admin: boolean;

  @ManyToOne(() => User, user => user.rooms)
  user: User;

  @ManyToOne(() => Lounge, lounge => lounge.rooms)
  lounge: Lounge;

  @OneToMany(() => Memo, memo => memo.room)
  memos: Memo[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
