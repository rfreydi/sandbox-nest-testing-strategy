import { Module } from '@nestjs/common';
import { CoreModule } from '@nts/core';
import { ConfigModule } from '@nestjs/config';
import { envFilePath } from '../../../core/env-file-path';
import { ExternalModule } from '@nts/external';
import { BuyersController } from './buyers/buyers.controller';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath }), CoreModule, ExternalModule],
  controllers: [BuyersController],
  providers: [],
})
export class ApiRestModule {}
