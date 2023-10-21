import { Resolver } from '@nestjs/graphql';
import { Estate } from './models/estate.model';

@Resolver(() => Estate)
export class EstateResolver {}
