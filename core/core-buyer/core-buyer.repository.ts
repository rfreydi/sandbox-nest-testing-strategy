import { CoreBuyer } from './core-buyer';
import { CoreBuyerAttributes } from './core-buyer-attributes';

export abstract class CoreBuyerRepository {
  abstract create(createBuyerDto: CoreBuyerAttributes): Promise<CoreBuyer>;
  abstract getByEmail(email: string): Promise<CoreBuyer>;
  abstract update(
    email: string,
    data: Partial<Omit<CoreBuyerAttributes, 'email' | 'password'>>,
  ): Promise<CoreBuyer>;
}
