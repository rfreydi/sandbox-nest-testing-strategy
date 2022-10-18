import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Meet {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @Column()
  email: string;

  @Column()
  meeterId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
