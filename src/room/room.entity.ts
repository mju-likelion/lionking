import { User } from 'src/auth/user.entity';
import { Lounge } from 'src/lounge/lounges.entity';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.rooms)
  user: User;

  @ManyToOne(() => Lounge, lounge => lounge.rooms)
  lounge: Lounge;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
