import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: FastifyReply['raw'], next: () => void) {
    console.log('Request default...', `IP: ${req.ip}`, `Method: ${req.method}`, `${req.originalUrl}`);
    next();
  }
}

