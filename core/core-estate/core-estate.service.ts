import { Injectable } from '@nestjs/common';
import { CoreEstate } from './core-estate';
import { SqlEstateAdapter } from '@nts/infrastructure';

@Injectable()
export class CoreEstateService {
  constructor(private repository: SqlEstateAdapter) {}

  getListForBuyer(id: string): Promise<CoreEstate[]> {
    return this.repository.getListForBuyer(id);
  }
}
