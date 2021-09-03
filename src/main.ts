import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const appOptions = {cors: true};
  const app = await NestFactory.create<NestExpressApplication>(AppModule, appOptions);

  app.use(cookieParser());
  app.setGlobalPrefix('api');

   // To enable cors origin 
   app.enableCors();  

   app.use(json({ limit: '50mb' }));
   app.use(urlencoded({ extended: true, limit: '50mb' }));
 
   app.useStaticAssets(join(__dirname, '..', 'public'));

  //  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));


   const swaggerCconfig = new DocumentBuilder()
    .setTitle('Bloggie Api')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerCconfig);
  SwaggerModule.setup('api', app, document);
  
 const config = app.get(ConfigService);

  await app.listen(config.get('PORT'));
  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(`Application is running in : ${await config.get('ENVIRONMENT')} mode`);


}
bootstrap();
