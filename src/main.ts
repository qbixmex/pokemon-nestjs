import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import e from 'express';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );

  const PORT = process.env.PORT;

  await app.listen(PORT);

  console.log(`App running on port ${ PORT }`);

}
bootstrap();
