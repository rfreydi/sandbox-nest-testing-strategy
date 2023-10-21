import { IsNumber } from 'class-validator';

export class CoreEstateFinancialModel {
  @IsNumber()
  grossReturn: number;
}
