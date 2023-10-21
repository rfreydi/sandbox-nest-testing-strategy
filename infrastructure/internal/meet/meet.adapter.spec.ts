import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';
import { Meeter } from '../dist/meeter';
import { MeetAdapter } from './meet.adapter';
import { Meet } from './meet.entity';
import { internalToken } from '../internal.token';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoreBuyer } from '@nts/core';

describe('MeetAdapter', () => {
  let service: MeetAdapter;
  let meeter: DeepMocked<Meeter>;
  let meetRepository: DeepMocked<Repository<Meet>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeetAdapter,
        {
          provide: getRepositoryToken(Meet, internalToken),
          useValue: createMock(),
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    service = module.get(MeetAdapter);
    meeter = module.get(Meeter);
    meetRepository = module.get(getRepositoryToken(Meet, internalToken));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMeet', () => {
    it(`
    WHEN Meeter and Repository succeed
    THEN saved data should be returned
    `, async () => {
      // Arrange
      const buyer = new CoreBuyer();
      buyer.email = 'romain.freydiger@outlook.fr';
      const date = new Date('2022-10-20');
      const id = '1';
      meeter.meet.mockResolvedValue({ id, date });
      meetRepository.save.mockImplementation((v: Meet) => Promise.resolve(v));

      // Act
      const meet = await service.createMeet(buyer, date);

      // Assert
      expect(meet).toEqual({
        email: buyer.email,
        meeterId: id,
      });
    });

    it(`
    WHEN Meeter fail
    THEN Error should be throw
    `, async () => {
      // Arrange
      const buyer = new CoreBuyer();
      buyer.email = 'romain.freydiger@outlook.fr';
      const date = new Date('2022-10-20');
      meeter.meet.mockRejectedValue('meet failed');

      // Act
      const call = () => service.createMeet(buyer, date);

      // Assert
      await expect(call).rejects.toThrowError();
    });

    it(`
    WHEN Repository fail
    THEN Error should be throw
    `, async () => {
      // Arrange
      const buyer = new CoreBuyer();
      buyer.email = 'romain.freydiger@outlook.fr';
      const date = new Date('2022-10-20');
      const id = '1';
      meeter.meet.mockResolvedValue({ id, date });
      meetRepository.save.mockRejectedValue('save failed');

      // Act
      const call = () => service.createMeet(buyer, date);

      // Assert
      await expect(call).rejects.toThrowError();
    });
  });
});
