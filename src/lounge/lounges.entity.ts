import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Lounge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: true })
  name: string;

  @Column({ default: 100, nullable: true })
  limit: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
