import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import moment from 'moment-timezone';
import compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap():Promise<void>{
  moment.tz.setDefault('Africa/Cairo');
  console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(compression());

  // CORS configuration
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });

  // app.useGlobalPipes(new ValidationPipe())
  app.useGlobalPipes(
    new I18nValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({ detailedErrors: false}),
  );

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT');
  await app.listen(port || 3000);
}
bootstrap();
