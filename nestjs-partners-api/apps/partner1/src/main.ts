import { NestFactory } from '@nestjs/core';
import { Partner1Module } from './partner1.module';

async function bootstrap() {
  const app = await NestFactory.create(Partner1Module);
  app.enableCors();
  const port = process.env.PORT_PARTNER1 || 3000;
  console.log(`Partner1 API rodando na porta ${port}`);
  await app.listen(port, '0.0.0.0');
}
bootstrap();