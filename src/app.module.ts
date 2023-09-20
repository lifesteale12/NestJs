import { APP_FILTER } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AppConfig from './config/app.config';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import TestConfig from './config/test.config';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { LogModule } from './log/log.module';

//format date
const { combine, timestamp, label, printf, json, ms } = winston.format;
const logFormat = combine(timestamp(), json(), ms());

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
      load: [AppConfig, TestConfig]
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('travel-match', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        new DailyRotateFile({
          filename: 'log/log-%DATE%-all.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '200m',
          maxFiles: '90d',
          format: logFormat,
        }),
        new DailyRotateFile({
          level: 'warn',
          filename: 'log/log-%DATE%-warn.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '200m',
          maxFiles: '90d',
          format: logFormat,
        }),
        new DailyRotateFile({
          level: 'error',
          filename: 'log/log-%DATE%-error.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '200m',
          maxFiles: '90d',
          format: logFormat,
        }),
      ],
    }),
    LogModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
