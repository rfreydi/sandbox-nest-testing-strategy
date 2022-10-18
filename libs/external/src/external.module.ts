import { Module } from '@nestjs/common';
import { TrackService } from './track/track.service';

@Module({
  providers: [TrackService],
  exports: [TrackService],
})
export class ExternalModule {}
