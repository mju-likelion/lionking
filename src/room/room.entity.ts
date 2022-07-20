import { Users } from 'src/auth/user.entity';
import { Lounges } from 'src/lounge/lounges.entity';
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

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Users, user => user.id)
  user: Users;

  @ManyToOne(() => Lounges, lounge => lounge.id)
  lounge: Lounges;
}
