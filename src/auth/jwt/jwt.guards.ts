import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { 
    // async canActivate(context: ExecutionContext) {
    //     const activate = (await super.canActivate(context)) as boolean;

    //     const request = context.switchToHttp().getRequest();
    //     const token = this.extractTokenFromHeader(request);
    //     await super.logIn(request);
    //     return activate;
    // }

    // private extractTokenFromHeader(request: Request): string | undefined {
    //     const [type, token] = request.headers.authorization?.split(' ') ?? [];
    //     return type === 'Bearer' ? token : undefined;
    // }
}
