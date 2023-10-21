import { Estate } from '@nts/infrastructure';
import { FinancialModel } from '@nts/computed';
import { CoreEstate } from '@nts/core';
import { toCoreId } from '../helpers/id.transform';

export class SqlEstateMapper {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toCore(
    { buyer: _, id, ...estate }: Estate,
    financialModel: FinancialModel,
  ): CoreEstate {
    return {
      id: toCoreId(id),
      ...estate,
      financialModel,
    };
  }
}
