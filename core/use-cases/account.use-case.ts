import { Injectable } from '@nestjs/common';
import { CoreBuyer } from '../entities/core-buyer/core-buyer';
import { CoreBuyerRepositoryPort } from '../entities/core-buyer/core-buyer.repository-port';
import { CoreBuyerAttributes } from '../entities/core-buyer/core-buyer-attributes';

@Injectable()
export class AccountUseCase {
  constructor(private coreBuyerRepositoryPort: CoreBuyerRepositoryPort) {}

  create(createBuyerDto: CoreBuyerAttributes): Promise<CoreBuyer> {
    return this.coreBuyerRepositoryPort.create(createBuyerDto);
  }

  update(
    email: string,
    data: Partial<Omit<CoreBuyerAttributes, 'email' | 'password'>>,
  ): Promise<CoreBuyer> {
    return this.coreBuyerRepositoryPort.update(email, data);
  }

  getAll(): Promise<CoreBuyer[]> {
    return this.coreBuyerRepositoryPort.getAll();
  }

  getByEmail(email: string): Promise<CoreBuyer> {
    return this.coreBuyerRepositoryPort.getByEmail(email);
  }
}
