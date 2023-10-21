import { CoreBuyer, CoreBuyerAttributes } from '@nts/core';
import { BuyerAttributes } from './buyer.attributes';
import { Buyer, User } from '@nts/infrastructure';
import { toCoreId } from '../helpers/id.transform';

export class SqlBuyerMapper {
  static fromCore({
    budgetMax,
    budgetMin,
  }: Partial<CoreBuyerAttributes>): Partial<BuyerAttributes> {
    return {
      ...(budgetMax !== undefined && { budgetMax }),
      ...(budgetMin !== undefined && { budgetMin }),
    };
  }

  static toCore({
    id,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: { id: _, hash, ...user },
    ...buyer
  }: Buyer & { user: User }): CoreBuyer {
    return {
      ...user,
      ...buyer,
      id: toCoreId(id),
    };
  }
}
