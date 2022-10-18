import { Injectable } from '@nestjs/common';
import {
  FinancialModel,
  FinancialModelDto,
} from '@nts/computed/computed.types';

@Injectable()
export class ComputedService {
  getFinancialModel({
    annualRent,
    netSeller,
  }: FinancialModelDto): FinancialModel {
    if (netSeller === 0) {
      throw new Error("netSeller can't be defined as 0");
    }
    return {
      grossReturn: annualRent / netSeller,
    };
  }
}
