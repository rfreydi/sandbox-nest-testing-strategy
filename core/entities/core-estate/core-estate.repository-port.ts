import { CoreEstate } from '@nts/core';

export abstract class CoreEstateRepositoryPort {
  abstract getListForBuyer(coreId: string): Promise<CoreEstate[]>;
}
