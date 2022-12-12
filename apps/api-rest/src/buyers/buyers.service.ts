import { Injectable } from '@nestjs/common';
import { TrackService } from '@nts/external';
import { CoreBuyerService } from '@nts/core';
import { BuyerAttribute } from './entities/buyer.attribute';
import { MeetService } from '@nts/internal';

@Injectable()
export class BuyersService {
  constructor(
    private coreBuyerService: CoreBuyerService,
    private meetService: MeetService,
    private trackService: TrackService,
  ) {}

  async create(createBuyerDto: BuyerAttribute) {
    const buyer = await this.coreBuyerService.create(createBuyerDto);
    this.trackService.track({ type: 'create', email: createBuyerDto.email });
    return buyer;
  }

  findAll() {
    return this.coreBuyerService.getAll();
  }

  findOne(email: string) {
    this.trackService.track({ type: 'findOne', email });
    return this.coreBuyerService.getByEmail(email);
  }

  createMeet(email: string, date: Date) {
    return this.meetService.takeFor(email, date);
  }
}
