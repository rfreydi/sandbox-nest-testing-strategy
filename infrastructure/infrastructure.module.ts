import { Module } from '@nestjs/common';
import { InternalModule } from './internal/internal.module';
import { SqlModule } from './sql/sql.module';

@Module({
  exports: [InternalModule, SqlModule],
  imports: [InternalModule, SqlModule],
  providers: [],
})
export class InfrastructureModule {}
