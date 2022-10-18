import { Injectable } from '@nestjs/common';
import { Tracker } from '../dist/tracker';

@Injectable()
export class TrackService {
  private tracker = new Tracker();

  track(data: Record<string, string>): Promise<void> {
    return this.tracker.track(data).catch((reason) => {
      console.error('track failed!', reason);
    });
  }
}
