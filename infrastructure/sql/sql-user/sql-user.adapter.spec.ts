import { Test, TestingModule } from '@nestjs/testing';
import { SqlUserAdapter } from './sql-user.adapter';

describe('SqlUserAdapter', () => {
  let service: SqlUserAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqlUserAdapter],
    }).compile();

    service = module.get<SqlUserAdapter>(SqlUserAdapter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
