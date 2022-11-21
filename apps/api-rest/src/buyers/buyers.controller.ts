import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { BuyerAttribute } from './entities/buyer.attribute';
import { Buyer } from './entities/buyer.entity';

@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @Post()
  create(@Body() createBuyerDto: BuyerAttribute) {
    return this.buyersService.create(createBuyerDto);
  }

  @Get()
  findAll() {
    return this.buyersService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<Omit<Buyer, 'password'>> {
    return this.buyersService.findOne(email);
  }

  @Post(':email/meet')
  createMeet(@Param('email') email: string, @Body('iso') iso: string) {
    return this.buyersService.createMeet(email, new Date(iso));
  }
}
