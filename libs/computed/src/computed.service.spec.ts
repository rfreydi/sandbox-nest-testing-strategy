import { Test, TestingModule } from '@nestjs/testing';
import { ComputedService } from './computed.service';

describe('ComputedService', () => {
  let service: ComputedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComputedService],
    }).compile();

    service = module.get<ComputedService>(ComputedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
