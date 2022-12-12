import { Test, TestingModule } from '@nestjs/testing';
import { TrackService } from '@nts/external';
import { Tracker } from '@nts/external/dist/tracker';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Logger } from '@nestjs/common';

describe('TrackService', () => {
  let service: TrackService;
  let tracker: DeepMocked<Tracker>;
  let logger: DeepMocked<Logger>;

  beforeEach(async () => {
    logger = createMock<Logger>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackService],
    })
      .setLogger(logger)
      .useMocker(createMock)
      .compile();

    service = module.get(TrackService);
    tracker = module.get(Tracker);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('track', () => {
    it(`
    WHEN Tracker fail
    THEN it should log and return nothing
    `, async () => {
      // Arrange
      const data: Parameters<TrackService['track']>[0] = {
        test: 'test',
        data: 'data',
      };
      const message = 'reject';
      tracker.track.mockRejectedValue(message);

      // Act
      const track = await service.track(data);

      // Assert
      expect(track).toBeUndefined();
      expect(logger.error).toHaveBeenCalledWith(
        'track failed!',
        message,
        TrackService.name,
      );
    });
  });
});
