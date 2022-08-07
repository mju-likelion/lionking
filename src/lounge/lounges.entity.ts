import { nanoid } from 'nanoid';
import { Room } from 'src/room/room.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Lounge {
  @PrimaryColumn({ length: 6, unique: true })
  id: string;

  @BeforeInsert()
  private beforeInsert() {
    this.id = nanoid(6);
  }

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
