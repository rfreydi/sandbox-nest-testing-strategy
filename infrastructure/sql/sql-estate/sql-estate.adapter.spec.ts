import { Test, TestingModule } from '@nestjs/testing';
import { SqlEstateAdapter } from '@nts/infrastructure';

describe('SqlEstateAdapter', () => {
  let service: SqlEstateAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqlEstateAdapter],
    }).compile();

    service = module.get<SqlEstateAdapter>(SqlEstateAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
