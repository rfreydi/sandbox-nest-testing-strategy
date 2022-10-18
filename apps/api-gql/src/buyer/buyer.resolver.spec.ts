import { Test, TestingModule } from '@nestjs/testing';
import { BuyerResolver } from './buyer.resolver';

describe('BuyerResolver', () => {
  let resolver: BuyerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyerResolver],
    }).compile();

    resolver = module.get<BuyerResolver>(BuyerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
