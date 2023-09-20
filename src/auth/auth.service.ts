import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { SignInDto } from './dto/signin-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
var bcryptjs = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }


  async signIn(signInDto: SignInDto) {
    try {
      var user = await this.varidate(signInDto.username, signInDto.password);
      const payloads = { username: signInDto.username, sub: user.id }

      return this.getTokens(user);

    } catch (error) {
      throw new NotFoundException(error);
    }

  }

  async getTokens(user: User) {
    try {
      const username = user.username;
      const userId = user.id;

      var date = new Date();
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          {
            sub: userId,
            user_id: userId,
            username,
            fullname: user.fullname,
            expires_date: new Date(date.setDate(date.getDate() + 1))
          },
          {
            expiresIn: jwtConstants.expire_secret,
            secret: jwtConstants.secret
          },
        ),
        this.jwtService.signAsync(
          {
            sub: userId,
            user_id: userId,
            username,
            expires_date: new Date(date.setDate(date.getDate() + 7))
          },
          {
            expiresIn: jwtConstants.expire_secret_refresh,
            secret: jwtConstants.secret_refresh
          },
        ),
      ]);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async varidate(username: string, password: string): Promise<any> {
    try {
      var user = await this.userService.findOneByUsername(username);

      if (user && await bcryptjs.compare(password, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && await bcryptjs.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
