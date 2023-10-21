import { IntersectionType, ObjectType } from '@nestjs/graphql';
import { BuyerAttribute } from './buyer.attribute';
import { BuyerRelationship } from './buyer.relationship';
import { CoreBuyer } from '@nts/core';

@ObjectType()
export class Buyer extends IntersectionType(BuyerAttribute, BuyerRelationship) {
  static fromCore(core: CoreBuyer): Omit<Buyer, 'estates'> {
    return core;
  }
}
