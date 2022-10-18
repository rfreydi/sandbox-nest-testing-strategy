import { Column } from 'typeorm';

export abstract class BuyerAttributes {
  @Column()
  budgetMin: number;

  @Column()
  budgetMax: number;
}
