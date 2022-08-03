import { Room } from 'src/room/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Lounge {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 20, nullable: true })
  name: string;

  @Column({ default: 100, nullable: true })
  limit: number;

  @OneToMany(() => Room, room => room.user)
  rooms: Room[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
