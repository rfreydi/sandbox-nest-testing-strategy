import { Module } from '@nestjs/common';
import { CoreEstateService } from './core-estate.service';
import { CoreEstateRepository } from './core-estate.repository';
import { SqlEstateAdapter, SqlModule } from '@nts/infrastructure';

@Module({
  exports: [CoreEstateService],
  imports: [SqlModule],
  providers: [
    CoreEstateService,
    {
      provide: CoreEstateRepository,
      useExisting: SqlEstateAdapter,
    },
  ],
})
export class CoreEstateModule {}
