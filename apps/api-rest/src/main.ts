import { NestFactory } from '@nestjs/core';
import { ApiRestModule } from './api-rest.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiRestModule);
  await app.listen(3000);
  console.log('App available at http://localhost:3000');
}
bootstrap();
