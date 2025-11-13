import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly _usersService: UsersService) {}

  signIn(signInDto: SignInDto) { 

  }

  signUp(signUpDto: SignUpDto) {
    return this._usersService.create(signUpDto);
  }

  getMe() {
            
  }
  
}
