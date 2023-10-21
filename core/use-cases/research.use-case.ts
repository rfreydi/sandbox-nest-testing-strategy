import { Injectable } from '@nestjs/common';
import { CoreEstate } from '../entities/core-estate/core-estate';
import { CoreEstateRepositoryPort } from '../entities/core-estate/core-estate.repository-port';

@Injectable()
export class ResearchUseCase {
  constructor(private coreEstateRepositoryPort: CoreEstateRepositoryPort) {}

  async getList(buyerId: string): Promise<CoreEstate[]> {
    return this.coreEstateRepositoryPort.getListForBuyer(buyerId);
  }
}
