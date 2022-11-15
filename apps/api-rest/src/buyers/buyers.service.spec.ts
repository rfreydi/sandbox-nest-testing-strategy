import { Test, TestingModule } from '@nestjs/testing';
import { BuyersService } from './buyers.service';
import { createMock } from '@golevelup/ts-jest';

describe('BuyersService', () => {
  let service: BuyersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyersService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<BuyersService>(BuyersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
