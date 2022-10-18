import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { BuyerAttribute } from '../models/buyer.attribute';

@InputType()
export class UpdateBuyerInput extends PartialType(
  OmitType(BuyerAttribute, ['id', 'email'] as const),
  InputType,
) {}
