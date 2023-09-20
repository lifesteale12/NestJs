/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
    private readonly logger = new Logger(LoggerService.name);

    doSomething() {
        this.logger.log('Doing something...');
    }
}
