import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Buyer } from '../sql-buyer/buyer.entity';

@Entity()
export class Estate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: 'available' | 'coveted' | 'sold';

  @Column()
  netSeller: number;

  @Column()
  rent: number;

  @ManyToOne(() => Buyer, (buyer) => buyer.estates, {
    cascade: true,
  })
  buyer: Buyer;
}
