import { Test, TestingModule } from '@nestjs/testing';
import { BuyerService } from './buyer.service';
import { createMock } from '@golevelup/ts-jest';

describe('BuyerService', () => {
  let service: BuyerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyerService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<BuyerService>(BuyerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
