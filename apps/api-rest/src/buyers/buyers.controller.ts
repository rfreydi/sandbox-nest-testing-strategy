import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BuyerAttribute } from './entities/buyer.attribute';
import { Buyer } from './entities/buyer.entity';
import { AccountUseCase, ConsultingUseCase } from '@nts/core';
import { TrackService } from '@nts/external';

@Controller('buyers')
export class BuyersController {
  constructor(
    private accountUseCase: AccountUseCase,
    private consultingUseCase: ConsultingUseCase,
    private trackService: TrackService,
  ) {}

  @Post()
  async create(@Body() createBuyerDto: BuyerAttribute) {
    const buyer = await this.accountUseCase.create(createBuyerDto);
    this.trackService.track({ type: 'create', email: createBuyerDto.email });
    return buyer;
  }

  @Get()
  findAll() {
    return this.accountUseCase.getAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<Omit<Buyer, 'password'>> {
    this.trackService.track({ type: 'findOne', email });
    return this.accountUseCase.getByEmail(email);
  }

  @Post(':email/meet')
  createMeet(@Param('email') email: string, @Body('iso') iso: string) {
    return this.consultingUseCase.createMeet(email, iso);
  }
}
