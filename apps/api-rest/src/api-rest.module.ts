import { Module } from '@nestjs/common';
import { CoreBuyerModule } from '@nts/core';
import { ConfigModule } from '@nestjs/config';
import { BuyersModule } from './buyers/buyers.module';

@Module({
  imports: [BuyersModule, ConfigModule.forRoot(), CoreBuyerModule],
  controllers: [],
  providers: [],
})
export class ApiRestModule {}
