import { Test, TestingModule } from '@nestjs/testing';
import { Meet, MeetService } from '@nts/internal';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { Meeter } from '@nts/internal/dist/meeter';
import { internalToken } from '@nts/internal/internal.token';

describe('MeetService', () => {
  let service: MeetService;
  let meeter: DeepMocked<Meeter>;
  let meetRepository: DeepMocked<Repository<Meet>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeetService,
        {
          provide: internalToken + '_MeetRepository',
          useValue: createMock(),
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    service = module.get(MeetService);
    meeter = module.get(Meeter);
    meetRepository = module.get(internalToken + '_MeetRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('takeFor', () => {
    it('WHEN Meeter and Repository succeed -> THEN saved data should be returned', async () => {
      // Arrange
      const email = 'romain.freydiger@masteos.com';
      const date = new Date('2022-10-20');
      const id = '1';
      meeter.meet.mockResolvedValue({ id, date });
      meetRepository.save.mockImplementation((v: Meet) => Promise.resolve(v));

      // Act
      const meet = await service.takeFor(email, date);

      // Assert
      expect(meet).toEqual({
        email,
        meeterId: id,
      });
    });

    it('WHEN Meeter fail -> THEN Error should be throw', async () => {
      // Arrange
      const email = 'romain.freydiger@masteos.com';
      const date = new Date('2022-10-20');
      meeter.meet.mockRejectedValue('meet failed');

      // Assert
      await expect(service.takeFor(email, date)).rejects.toThrowError();
    });

    it('WHEN Repository fail -> THEN Error should be throw', async () => {
      // Arrange
      const email = 'romain.freydiger@masteos.com';
      const date = new Date('2022-10-20');
      const id = '1';
      meeter.meet.mockResolvedValue({ id, date });
      meetRepository.save.mockRejectedValue('save failed');

      // Act
      const call = () => service.takeFor(email, date);

      // Assert
      await expect(call).rejects.toThrowError();
    });
  });
});
