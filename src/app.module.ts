import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AppConfig from './config/app.config';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import TestConfig from './config/test.config';


@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env',`.env.${process.env.NODE_ENV}`],
      load: [AppConfig, TestConfig]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
