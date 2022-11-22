import { Injectable, Logger } from '@nestjs/common';
import { Tracker } from '../dist/tracker';

@Injectable()
export class TrackService {
  private readonly logger = new Logger(TrackService.name);

  constructor(private tracker: Tracker) {}

  track(data: Record<string, string>): Promise<void> {
    return this.tracker.track(data).catch((reason) => {
      this.logger.error('track failed!', reason);
    });
  }
}
