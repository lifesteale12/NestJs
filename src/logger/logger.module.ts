/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MyLogger } from './logger';

@Module({
  imports: [],
  controllers: [],
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule { }
