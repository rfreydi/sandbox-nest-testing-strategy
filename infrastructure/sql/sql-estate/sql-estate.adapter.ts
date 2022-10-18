import { Injectable } from '@nestjs/common';
import { CoreEstate, CoreEstateRepository } from '@nts/core';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Estate } from './estate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { toCoreId, toSqlId } from '../helpers/id.transform';

@Injectable()
export class SqlEstateAdapter implements CoreEstateRepository {
  private get queryBuilder(): SelectQueryBuilder<Estate> {
    return this.estateRepository.createQueryBuilder('estate');
  }
  constructor(
    @InjectRepository(Estate)
    private estateRepository: Repository<Estate>,
  ) {}

  getListForBuyer(coreId: string): Promise<CoreEstate[]> {
    return this.queryBuilder
      .innerJoin('estate.buyer', 'estateBuyer')
      .where('estateBuyer.id = estate.id')
      .innerJoin('estateBuyer.user', 'buyerUser')
      .where('buyerUser.id = :id', { id: toSqlId(coreId) })
      .getMany()
      .then((estateList) => estateList.map(SqlEstateAdapter.toCore));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toCore({ buyer, id, ...estate }: Estate): CoreEstate {
    return {
      id: toCoreId(id),
      ...estate,
    };
  }
}
