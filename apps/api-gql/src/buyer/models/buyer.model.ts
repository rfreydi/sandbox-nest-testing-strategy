import { IntersectionType, ObjectType } from '@nestjs/graphql';
import { BuyerAttribute } from './buyer.attribute';
import { BuyerRelationship } from './buyer.relationship';

@ObjectType()
export class Buyer extends IntersectionType(
  BuyerAttribute,
  BuyerRelationship,
) {}
