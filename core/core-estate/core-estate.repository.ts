import { CoreEstate } from '@nts/core';

export abstract class CoreEstateRepository {
  abstract getListForBuyer(coreId: string): Promise<CoreEstate[]>;
}
