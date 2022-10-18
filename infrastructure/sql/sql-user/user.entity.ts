import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { UserAttributes } from './user.attributes';

@Entity()
export class User extends UserAttributes {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @IsNotEmpty()
  hash: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
