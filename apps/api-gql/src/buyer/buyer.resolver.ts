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
import { BuyerService } from './buyer.service';
import { Estate } from '../estate/models/estate.model';
import { EstateService } from '../estate/estate.service';

@Resolver(() => Buyer)
export class BuyerResolver {
  constructor(
    private buyerService: BuyerService,
    private estateService: EstateService,
  ) {}

  @Query(() => Buyer)
  me(@Args('email') email: string) {
    return this.buyerService.getByEmail(email);
  }

  @Mutation(() => Buyer)
  updateBuyer(
    @Args('email') email: string,
    @Args('updateBuyerData') updateBuyerData: UpdateBuyerInput,
  ) {
    return this.buyerService.update(email, updateBuyerData);
  }

  @ResolveField(() => [Estate])
  estates(@Parent() parent: Buyer) {
    return this.estateService.getList(parent.id);
  }
}
