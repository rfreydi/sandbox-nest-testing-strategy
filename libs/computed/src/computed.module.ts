import { Module } from '@nestjs/common';
import { ComputedService } from './computed.service';

@Module({
  providers: [ComputedService],
  exports: [ComputedService],
})
export class ComputedModule {}
