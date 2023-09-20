// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { Strategy } from 'passport-jwt';
// import { ExtractJwt } from 'passport-jwt';
// import { jwtConstants } from '../constants';

// @Injectable()
// export class RefreshStrategy extends PassportStrategy(Strategy) {
//     constructor() {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: jwtConstants.secret_refresh,
//         });
//     }

//     async validate(payload: any) {
//         return { userId: payload.sub, username: payload.username };
//     }
// }