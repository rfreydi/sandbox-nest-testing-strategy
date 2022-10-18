import { Field, ObjectType } from '@nestjs/graphql';
import { EstateFinancialModel } from './estate-financial-model.model';

@ObjectType()
export class Estate {
  @Field()
  id: string;

  @Field()
  netSeller: number;

  @Field()
  rent: number;

  @Field()
  status: 'available' | 'coveted' | 'sold';

  @Field()
  financialModel: EstateFinancialModel = new EstateFinancialModel();
}
