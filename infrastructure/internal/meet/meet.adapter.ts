import { Injectable } from '@nestjs/common';
import { Meeter } from '../dist/meeter';
import { Repository } from 'typeorm';
import { Meet } from './meet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { internalToken } from '../internal.token';
import { MeetPort } from '../../../core/ports/meet.port';
import { CoreBuyer } from '@nts/core';

@Injectable()
export class MeetAdapter implements MeetPort {
  constructor(
    private meeter: Meeter,
    @InjectRepository(Meet, internalToken)
    private meetRepository: Repository<Meet>,
  ) {}

  createMeet(coreBuyer: CoreBuyer, date: Date): Promise<Meet | void> {
    return this.meeter
      .meet(coreBuyer.email, date)
      .then(({ id }) => {
        const meet = new Meet();
        meet.email = coreBuyer.email;
        meet.meeterId = id;
        return this.meetRepository.save(meet);
      })
      .catch((err) => {
        // log err
        throw new Error(`Unable to take for ${coreBuyer.email}.`);
      });
  }
}
