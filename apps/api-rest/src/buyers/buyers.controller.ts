import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBuyerDto: Partial<Omit<BuyerAttribute, 'password'>>,
  ) {
    return this.buyersService.update(+id, updateBuyerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyersService.remove(+id);
  }

  @Post(':email/meet')
  createMeet(@Param('email') email: string, @Body('date') iso: string) {
    return this.buyersService.createMeet(email, new Date(iso));
  }
}
