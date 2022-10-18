import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Estate } from './models/estate.model';
import { EstateService } from './estate.service';
import { EstateFinancialModel } from './models/estate-financial-model.model';

@Resolver(() => Estate)
export class EstateResolver {
  constructor(private estateService: EstateService) {}

  @ResolveField(() => EstateFinancialModel)
  financialModel(@Parent() parent: Estate) {
    return this.estateService.getFinancialModel(parent);
  }
}
