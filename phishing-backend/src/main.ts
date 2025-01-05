import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import {Logger, ValidationPipe} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ExceptionHandlerFilter from "./exceptions/exception-handler.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: {
      origin: '*',
      credentials: false,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    },
    logger: ['error', 'warn', 'debug', 'log'],
  });
  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);

  const logger = new Logger()
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(
      new ExceptionHandlerFilter(httpAdapter, configService, logger),
  );

  const APP_PORT = configService.get('app.port');
  await app.listen(APP_PORT, () => {
    console.log(`App running in http://localhost:${APP_PORT}`);
  });
}
bootstrap();
