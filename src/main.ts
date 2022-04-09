import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const {
  APP_HOST: appHost,
  APP_NAME: appName,
  APP_DESCRIPTION: appDescription,
  APP_PORT: appPort,
} = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.use(cookieParser());

  app.enableCors();
  app.use(helmet());

  const config = new DocumentBuilder()
    .addServer(appHost)
    .setTitle(appName)
    .setDescription(appDescription)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(appPort);
}
bootstrap();
