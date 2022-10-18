import { Injectable } from '@nestjs/common';
import { CoreBuyer } from './core-buyer';
import { CoreBuyerRepository } from './core-buyer.repository';
import { CoreBuyerAttributes } from './core-buyer-attributes';

@Injectable()
export class CoreBuyerService {
  constructor(private repository: CoreBuyerRepository) {}

  create(createBuyerDto: CoreBuyerAttributes): Promise<CoreBuyer> {
    return this.repository.create(createBuyerDto);
  }

  update(
    email: string,
    data: Partial<Omit<CoreBuyerAttributes, 'email' | 'password'>>,
  ): Promise<CoreBuyer> {
    return this.repository.update(email, data);
  }

  getByEmail(email: string): Promise<CoreBuyer> {
    return this.repository.getByEmail(email);
  }
}
