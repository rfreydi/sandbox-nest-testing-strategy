import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Buyer } from './buyer.entity';
import {
  CoreBuyer,
  CoreBuyerAttributes,
  CoreBuyerRepository,
  CoreUser,
} from '@nts/core';
import { User } from '../sql-user/user.entity';
import { toCoreId } from '../helpers/id.transform';
import { BuyerAttributes } from './buyer.attributes';
import { SqlUserAdapter } from '../sql-user/sql-user.adapter';

@Injectable()
export class SqlBuyerAdapter implements CoreBuyerRepository {
  private get queryBuilder(): SelectQueryBuilder<Buyer & { user: User }> {
    return this.buyerRepository
      .createQueryBuilder('buyer')
      .leftJoinAndSelect('buyer.user', 'user') as SelectQueryBuilder<
      Buyer & { user: User }
    >;
  }

  constructor(
    @InjectRepository(Buyer)
    private buyerRepository: Repository<Buyer>,
  ) {}

  create(
    createBuyerDto: CoreBuyerAttributes & Pick<CoreUser, 'email' | 'password'>,
  ): Promise<CoreBuyer> {
    const user = new User();
    user.createdAt = new Date();
    user.email = createBuyerDto.email;
    user.hash = Buffer.from(createBuyerDto.password).toString('base64');
    user.firstName = createBuyerDto.firstName;
    user.lastName = createBuyerDto.lastName;

    const buyer = new Buyer();
    buyer.budgetMin = createBuyerDto.budgetMin;
    buyer.budgetMax = createBuyerDto.budgetMax;
    buyer.user = user;

    return this.buyerRepository.save(buyer).then(SqlBuyerAdapter.toCore);
  }

  getByEmail(email: string): Promise<CoreBuyer> {
    return this.queryBuilder
      .where('user.email = :email', { email })
      .getOne()
      .then(SqlBuyerAdapter.toCore);
  }

  async update(
    email: string,
    data: Partial<Omit<CoreBuyerAttributes, 'email' | 'password'>>,
  ): Promise<CoreBuyer> {
    const buyer = await this.queryBuilder
      .where('user.email = :email', { email })
      .getOne();

    if (!buyer) {
      throw new Error('buyer not found');
    }

    await this.queryBuilder
      .update()
      .set(SqlBuyerAdapter.fromCore(data))
      .where('id = :id', { id: buyer.id })
      .execute();

    await this.queryBuilder
      .update(User)
      .set(SqlUserAdapter.fromCore(data))
      .where('id = :id', { id: buyer.user.id })
      .execute();

    return this.getByEmail(email);
  }

  static fromCore({
    budgetMax,
    budgetMin,
  }: Partial<CoreBuyerAttributes>): Partial<BuyerAttributes> {
    return {
      ...(budgetMax !== undefined && { budgetMax }),
      ...(budgetMin !== undefined && { budgetMin }),
    };
  }

  static toCore({
    id,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: { id: _, hash, ...user },
    ...buyer
  }: Buyer & { user: User }): CoreBuyer {
    return {
      ...user,
      ...buyer,
      id: toCoreId(id),
    };
  }
}
