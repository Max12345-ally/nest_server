import type { Response, Request } from 'express';
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtDualGuard } from './guard/jwt-dual.guard';
import type { RequestWithUser } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this._authService.signIn(signInDto); 
  }

  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token } = await this._authService.signUp(signUpDto);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false, // ❗ в dev можно false, но в проде обязательно true
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // время жизни cookie токена
    });

    return {
      token
    };
  }

  @UseGuards(JwtDualGuard)
  @Get('me')
  getMe(
    @Req() req: RequestWithUser
  ) {
    return this._authService.getMe(req.user.sub);
  }

}
