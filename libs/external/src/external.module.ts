import { Module } from '@nestjs/common';
import { TrackService } from './track/track.service';
import { Tracker } from '@nts/external/dist/tracker';
import { TrackerFake } from '@nts/external/dist/tracker.fake';

@Module({
  providers: [
    TrackService,
    {
      provide: Tracker,
      useValue:
        process.env.NODE_ENV === 'test' ? new TrackerFake() : new Tracker(),
    },
  ],
  exports: [TrackService],
})
export class ExternalModule {}
