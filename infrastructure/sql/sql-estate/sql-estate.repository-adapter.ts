import { Injectable } from '@nestjs/common';
import { CoreEstate, CoreEstateRepositoryPort } from '@nts/core';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Estate } from './estate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { toSqlId } from '../helpers/id.transform';
import { ComputedService } from '@nts/computed';
import { SqlEstateMapper } from './sql-estate.mapper';

@Injectable()
export class SqlEstateRepositoryAdapter implements CoreEstateRepositoryPort {
  private get queryBuilder(): SelectQueryBuilder<Estate> {
    return this.estateRepository.createQueryBuilder('estate');
  }
  constructor(
    @InjectRepository(Estate)
    private estateRepository: Repository<Estate>,
    private computedService: ComputedService,
  ) {}

  getListForBuyer(coreId: string): Promise<CoreEstate[]> {
    return this.queryBuilder
      .innerJoin('estate.buyer', 'estateBuyer')
      .where('estateBuyer.id = estate.id')
      .innerJoin('estateBuyer.user', 'buyerUser')
      .where('buyerUser.id = :id', { id: toSqlId(coreId) })
      .getMany()
      .then((estateList) =>
        estateList.map((estate) =>
          SqlEstateMapper.toCore(
            estate,
            this.computedService.getFinancialModel({
              annualRent: estate.rent,
              netSeller: estate.netSeller,
            }),
          ),
        ),
      );
  }
}
