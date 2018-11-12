import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {} from 'http-server' //en typescript para importar

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
