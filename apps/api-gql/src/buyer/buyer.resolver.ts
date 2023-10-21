import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UpdateBuyerInput } from './inputs/update-buyer.input';
import { Buyer } from './models/buyer.model';
import { Estate } from '../estate/models/estate.model';
import { AccountUseCase, ResearchUseCase } from '@nts/core';

@Resolver(() => Buyer)
export class BuyerResolver {
  constructor(
    private accountUseCase: AccountUseCase,
    private researchUseCase: ResearchUseCase,
  ) {}

  @Query(() => Buyer)
  async me(@Args('email') email: string) {
    const coreBuyer = await this.accountUseCase.getByEmail(email);
    return Buyer.fromCore(coreBuyer);
  }

  @Mutation(() => Buyer)
  updateBuyer(
    @Args('email') email: string,
    @Args('updateBuyerData') updateBuyerData: UpdateBuyerInput,
  ) {
    return this.accountUseCase.update(email, updateBuyerData);
  }

  @ResolveField(() => [Estate])
  estates(@Parent() parent: Buyer) {
    return this.researchUseCase.getList(parent.id);
  }
}
