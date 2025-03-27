import { NestFactory } from '@nestjs/core';
import { Partner2Module } from './partner2.module';

async function bootstrap() {
  const app = await NestFactory.create(Partner2Module);
  app.enableCors();
  const port = process.env.PORT_PARTNER2 || 3001;
  console.log(`Partner2 API rodando na porta ${port}`);
  await app.listen(port, '0.0.0.0');
}
bootstrap();