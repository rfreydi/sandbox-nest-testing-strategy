import { Injectable } from '@nestjs/common';
import { ComputedService, FinancialModel } from '@nts/computed';
import { CoreEstateService } from '@nts/core';
import { Estate } from './models/estate.model';

@Injectable()
export class EstateService {
  constructor(
    private computedService: ComputedService,
    private coreEstateService: CoreEstateService,
  ) {}

  getList(buyerId: string): Promise<Omit<Estate, 'financialModel'>[]> {
    return this.coreEstateService.getListForBuyer(buyerId);
  }

  getFinancialModel(estate: Estate): FinancialModel {
    return this.computedService.getFinancialModel({
      annualRent: estate.rent * 12,
      netSeller: estate.netSeller,
    });
  }
}
