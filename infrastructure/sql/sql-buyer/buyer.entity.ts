import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../sql-user/user.entity';
import { Estate } from '../sql-estate/estate.entity';
import { BuyerAttributes } from './buyer.attributes';

@Entity()
export class Buyer extends BuyerAttributes {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, {
    cascade: true,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Estate, (estate) => estate.buyer)
  estates: Estate[];
}
