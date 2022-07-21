import { User } from 'src/auth/user.entity';
import { Lounge } from 'src/lounge/lounges.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: true })
  loungeName: string;

  @ManyToOne(() => User, user => user.rooms)
  user: User;

  @ManyToOne(() => Lounge, lounge => lounge.rooms)
  lounge: Lounge;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
