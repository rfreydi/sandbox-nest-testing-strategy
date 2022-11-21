import { Test, TestingModule } from '@nestjs/testing';
import { EstateService } from './estate.service';
import { createMock } from '@golevelup/ts-jest';

describe('EstateService', () => {
  let service: EstateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstateService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<EstateService>(EstateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
