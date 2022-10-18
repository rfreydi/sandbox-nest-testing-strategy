import { Test, TestingModule } from '@nestjs/testing';
import { EstateResolver } from './estate.resolver';

describe('EstateResolver', () => {
  let resolver: EstateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstateResolver],
    }).compile();

    resolver = module.get<EstateResolver>(EstateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
