import { Test, TestingModule } from '@nestjs/testing';
import { SqlBuyerAdapter } from './sql-buyer.adapter';

describe('SqlBuyerAdapter', () => {
  let service: SqlBuyerAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqlBuyerAdapter],
    }).compile();

    service = module.get<SqlBuyerAdapter>(SqlBuyerAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
