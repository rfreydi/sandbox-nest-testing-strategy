import { Test, TestingModule } from '@nestjs/testing';
import { CoreUserService } from '@nts/core';

describe('CoreUserService', () => {
  let service: CoreUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreUserService],
    }).compile();

    service = module.get<CoreUserService>(CoreUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
