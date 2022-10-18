import { Module } from '@nestjs/common';
import { CoreBuyerService } from './core-buyer.service';
import { CoreBuyerRepository } from './core-buyer.repository';
import { SqlBuyerAdapter, SqlModule } from '@nts/infrastructure';

@Module({
  exports: [CoreBuyerService],
  imports: [SqlModule],
  providers: [
    CoreBuyerService,
    {
      provide: CoreBuyerRepository,
      useExisting: SqlBuyerAdapter,
    },
  ],
})
export class CoreBuyerModule {}
