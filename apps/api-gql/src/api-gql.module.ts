import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BuyerResolver } from './buyer/buyer.resolver';
import { CoreModule } from '@nts/core';
import { ComputedModule } from '@nts/computed';
import { EstateResolver } from './estate/estate.resolver';
import { ConfigModule } from '@nestjs/config';
import { envFilePath } from '../../../core/env-file-path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ComputedModule,
    ConfigModule.forRoot({ envFilePath }),
    CoreModule,
  ],
  controllers: [],
  providers: [BuyerResolver, EstateResolver],
})
export class ApiGqlModule {}
