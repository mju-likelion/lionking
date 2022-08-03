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
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: false, nullable: false })
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
