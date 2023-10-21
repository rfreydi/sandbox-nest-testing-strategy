import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Buyer } from './buyer.entity';
import {
  CoreBuyer,
  CoreBuyerAttributes,
  CoreBuyerRepositoryPort,
  CoreUser,
} from '@nts/core';
import { User } from '../sql-user/user.entity';
import { SqlBuyerMapper } from './sql-buyer.mapper';
import { SqlUserMapper } from '../sql-user/sql-user.mapper';

@Injectable()
export class SqlBuyerRepositoryAdapter implements CoreBuyerRepositoryPort {
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

    return this.buyerRepository.save(buyer).then(SqlBuyerMapper.toCore);
  }

  getAll(): Promise<CoreBuyer[]> {
    return this.queryBuilder
      .getMany()
      .then((buyers) => buyers.map(SqlBuyerMapper.toCore));
  }

  getByEmail(email: string): Promise<CoreBuyer> {
    return this.queryBuilder
      .where('user.email = :email', { email })
      .getOne()
      .then(SqlBuyerMapper.toCore);
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
      .set(SqlBuyerMapper.fromCore(data))
      .where('id = :id', { id: buyer.id })
      .execute();

    await this.queryBuilder
      .update(User)
      .set(SqlUserMapper.fromCore(data))
      .where('id = :id', { id: buyer.user.id })
      .execute();

    return this.getByEmail(email);
  }
}
