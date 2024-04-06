import { setupSwagger } from './swagger.setup';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('PORT') || 3000;
  const dbPort = configService.get<number>('POSTGRES_PORT') || 5432;

  setupSwagger(app);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/shared'));

  await app.listen(appPort);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`PostgreSQL is running on port: ${dbPort}`);
}

bootstrap();