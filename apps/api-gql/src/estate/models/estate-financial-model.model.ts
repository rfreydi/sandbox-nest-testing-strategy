import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EstateFinancialModel {
  @Field()
  grossReturn: number;
}
