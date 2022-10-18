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

  create(createBuyerDto: BuyerAttribute) {
    this.trackService.track({ type: 'create', email: createBuyerDto.email });
    return this.coreBuyerService.create(createBuyerDto);
  }

  findAll() {
    return `This action returns all buyers`;
  }

  findOne(email: string) {
    this.trackService.track({ type: 'findOne', email });
    return this.coreBuyerService.getByEmail(email);
  }

  update(
    id: number,
    updateBuyerDto: Partial<Omit<BuyerAttribute, 'password'>>,
  ) {
    return `This action updates a #${id} buyer`;
  }

  remove(id: number) {
    return `This action removes a #${id} buyer`;
  }

  createMeet(email: string, date: Date) {
    return this.meetService.takeFor(email, date);
  }
}
