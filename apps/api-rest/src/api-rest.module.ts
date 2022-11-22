import { Module } from '@nestjs/common';
import { CoreBuyerModule } from '@nts/core';
import { ConfigModule } from '@nestjs/config';
import { envFilePath } from '../../../core/env-file-path';
import { ExternalModule } from '@nts/external';
import { InternalModule } from '@nts/internal';
import { BuyersService } from './buyers/buyers.service';
import { BuyersController } from './buyers/buyers.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    CoreBuyerModule,
    ExternalModule,
    InternalModule,
  ],
  controllers: [BuyersController],
  providers: [BuyersService],
})
export class ApiRestModule {}
