import { IsNotEmpty, IsString } from 'class-validator';
import { CoreBuyerAttributes } from './core-buyer-attributes';

export class CoreBuyer extends CoreBuyerAttributes {
  @IsString()
  @IsNotEmpty()
  id: string;
}
