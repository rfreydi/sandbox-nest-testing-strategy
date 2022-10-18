import { NestFactory } from '@nestjs/core';
import { ApiGqlModule } from './api-gql.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGqlModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
  console.log('App available at http://localhost:3000/graphql');
}
bootstrap();
