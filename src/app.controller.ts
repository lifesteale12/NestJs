import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { RouteConfig } from '@nestjs/platform-fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('routingconfig')
  @RouteConfig({ output: 'test routingconfig' })
  getRoutingConfig(@Req() req): string {
    return req.routeConfig.output;
  }
}
