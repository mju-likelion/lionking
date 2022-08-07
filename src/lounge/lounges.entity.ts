import { Room } from 'src/room/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Lounge {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 20, nullable: true })
  name: string;

  @Column({ default: 100, nullable: true })
  limit: number;

  @OneToMany(() => Room, room => room.lounge)
  rooms: Room[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
