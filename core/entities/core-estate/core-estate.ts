import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { CoreEstateFinancialModel } from './core-estate-financial-model';

export class CoreEstate {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  netSeller: number;

  @IsNumber()
  @IsNotEmpty()
  rent: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(available|coveted|sold)$/)
  status: 'available' | 'coveted' | 'sold';

  financialModel: CoreEstateFinancialModel;
}
