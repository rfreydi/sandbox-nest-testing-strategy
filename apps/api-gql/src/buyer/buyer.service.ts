import { Injectable } from '@nestjs/common';
import { UpdateBuyerInput } from './inputs/update-buyer.input';
import { CoreBuyerService } from '@nts/core';
import { BuyerAttribute } from './models/buyer.attribute';

@Injectable()
export class BuyerService {
  constructor(private coreBuyerService: CoreBuyerService) {}

  getByEmail(email: string): Promise<BuyerAttribute> {
    return this.coreBuyerService.getByEmail(email);
  }

  update(email: string, data: UpdateBuyerInput): Promise<BuyerAttribute> {
    return this.coreBuyerService.update(email, data);
  }
}
