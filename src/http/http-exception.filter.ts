/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ignoreElements } from 'rxjs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  // constructor(private readonly logger: Logger) { }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const message = exception.getResponse();

    console.log(request.ip, `URL : ${request.url} , request : ${JSON.stringify(request.body)}, Content : ${JSON.stringify(message).toString()}`);

    // Define a replacer function to exclude properties
    function replacer(key, value) {
      if (key === 'password') {
        return undefined; // Exclude the 'password' property
      }
      return value;
    }
    const [ipaddres] = request.ip.split(':').reverse() ?? [];
    this.logger.error(
      `IPaddress: ${ipaddres}, URL : ${request.url} , Body : ${JSON.stringify(request.body, replacer).toString()}, Content: ${JSON.stringify(message).toString()}`
    );

    response.status(status).send({ status_code: status, message: message['message'], name: message['name'] });
  }
}
