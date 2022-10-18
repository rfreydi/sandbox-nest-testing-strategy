import { Test, TestingModule } from '@nestjs/testing';
import { CoreBuyerService } from '@nts/core';

describe('CoreBuyerService', () => {
  let service: CoreBuyerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreBuyerService],
    }).compile();

    service = module.get<CoreBuyerService>(CoreBuyerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
