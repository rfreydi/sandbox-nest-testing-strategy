import { Test, TestingModule } from '@nestjs/testing';
import { CoreEstateService } from '@nts/core';

describe('CoreEstateService', () => {
  let service: CoreEstateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreEstateService],
    }).compile();

    service = module.get<CoreEstateService>(CoreEstateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
