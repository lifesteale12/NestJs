import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config/interfaces/app-config.interface';
import { ITestConfig } from './config/interfaces/test-config.interfaces';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { LoggerMiddleware } from './logger/logger.middleware';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './http/http-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter({
      logger: false
    }));


  // validation
  app.useGlobalPipes(new ValidationPipe({
    // whitelist: true,
    transform: true
  }),)


  //.env-config
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>('app');
  const testConfig = configService.get<ITestConfig>('test');

  app.setGlobalPrefix('api');

  //passport
  app.use(
    session({
      secret: appConfig.secert,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();

  //swagger
  const config = new DocumentBuilder()
    .setTitle(`${appConfig.app_name} example`)
    .setDescription(`The ${appConfig.app_name} API description`)
    .setVersion(testConfig.version)
    .addSecurity('Bearer', {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'JWTAuthorization header using the Bearer scheme. Example: "Authorization: Bearer {tokek}"'
    })
    .addSecurityRequirements('Bearer', ['type'])
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: false,
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);


  // logger.middleware
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // const logss = app.get(Logger);
  app.useGlobalFilters(new HttpExceptionFilter());


  const result = await app.listen(appConfig.app_port, '0.0.0.0');
  console.log(`server running on port: `, appConfig.app_port);
  console.log(`app name: `, appConfig.app_name);
  console.log(`environment:`, process.env.NODE_ENV);
  console.log(`version: `, testConfig.version);
}
bootstrap();
