import { Module } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { BuyersController } from './buyers.controller';
import { CoreBuyerModule } from '@nts/core';
import { ExternalModule } from '@nts/external';
import { InternalModule } from '@nts/internal';

@Module({
  controllers: [BuyersController],
  imports: [CoreBuyerModule, ExternalModule, InternalModule],
  providers: [BuyersService],
})
export class BuyersModule {}
