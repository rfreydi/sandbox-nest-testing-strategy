import { Field, ObjectType } from '@nestjs/graphql';
import { Estate } from '../../estate/models/estate.model';

@ObjectType()
export class BuyerRelationship {
  @Field(() => [Estate])
  estates: Estate[] = [];
}
