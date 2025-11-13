import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService ) {}
  
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this._authService.signIn(signInDto); 
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this._authService.signUp(signUpDto); 
  }

  @Get('me')
  getMe() {
    return this._authService.getMe();
  }

}
