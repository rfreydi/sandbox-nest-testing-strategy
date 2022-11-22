import { Injectable } from '@nestjs/common';
import { Meeter } from '../dist/meeter';
import { Repository } from 'typeorm';
import { Meet } from '@nts/internal/meet/meet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { internalToken } from '@nts/internal/internal.token';

@Injectable()
export class MeetService {
  constructor(
    private meeter: Meeter,
    @InjectRepository(Meet, internalToken)
    private meetRepository: Repository<Meet>,
  ) {}

  takeFor(email: string, date: Date): Promise<Meet | void> {
    return this.meeter
      .meet(email, date)
      .then(({ id }) => {
        const meet = new Meet();
        meet.email = email;
        meet.meeterId = id;
        return this.meetRepository.save(meet);
      })
      .catch((err) => {
        // log err
        throw new Error(`Unable to take for ${email}.`);
      });
  }
}
