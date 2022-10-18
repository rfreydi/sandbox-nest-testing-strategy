import { IsNotEmpty, IsString } from 'class-validator';
import { BuyerAttribute } from './buyer.attribute';

export class Buyer extends BuyerAttribute {
  @IsString()
  @IsNotEmpty()
  id: string;
}
