import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignInDto } from './dto/signin-auth.dto';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LocalAuthGuard } from './local/local.guards';
import { JwtAuthGuard } from './jwt/jwt.guards';
import { Request } from 'express';
import { RefreshGuard } from './refresh/refresh.guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: 'Logins', description: "Login sign JWT-Token" })
  @ApiOkResponse({ description: 'successfully' })
  @ApiBadRequestResponse({ description: 'bad request' })
  @ApiInternalServerErrorResponse({ description: 'server error' })
  async signIn(@Body() body: SignInDto) {
    return await this.authService.signIn(body);
  }

  @Post('register')
  // @ApiBody()
  async signUp(@Body() body: any) {
    return "";
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('refresh')
  @UseGuards(RefreshGuard)
  async refreshToken(@Req() req: Request) {
    return req.user;
  }
}
