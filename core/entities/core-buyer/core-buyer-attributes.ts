import { IsNotEmpty, IsNumber } from 'class-validator';
import { CoreUserAttributes } from '../core-user/core-user-attributes';

export class CoreBuyerAttributes extends CoreUserAttributes {
  @IsNumber()
  @IsNotEmpty()
  budgetMin: number;

  @IsNumber()
  @IsNotEmpty()
  budgetMax: number;
}
