import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserResInterceptor } from './interceptors/user-res-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new UserResInterceptor());
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({}));

  await app.listen(3000);
}
bootstrap();
