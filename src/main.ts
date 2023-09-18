import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config/interfaces/app-config.interface';
import { ITestConfig } from './config/interfaces/test-config.interfaces';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //.env-config
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>('app');
  const testConfig = configService.get<ITestConfig>('test');

  //swagger
  const config = new DocumentBuilder()
    .setTitle(`${appConfig.app_name} example`)
    .setDescription(`The ${appConfig.app_name} API description`)
    .setVersion(testConfig.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);


  const result = await app.listen(appConfig.app_port, '0.0.0.0');
  console.log(`server running on port: `, appConfig.app_port);
  console.log(`app name: `, appConfig.app_name);
  console.log(`environment:`, process.env.NODE_ENV);
  

  console.log(`version: `, testConfig.version);
}
bootstrap();
