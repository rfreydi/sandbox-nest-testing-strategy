import { Module } from '@nestjs/common';
import { CoreUserService } from './core-user.service';
import { CoreUserRepository } from './core-user.repository';
import { SqlModule, SqlUserAdapter } from '@nts/infrastructure';

@Module({
  exports: [CoreUserService],
  imports: [SqlModule],
  providers: [
    CoreUserService,
    {
      provide: CoreUserRepository,
      useExisting: SqlUserAdapter,
    },
  ],
})
export class CoreUserModule {}
