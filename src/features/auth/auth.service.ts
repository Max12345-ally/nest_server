import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService
  ) {}

  signIn(signInDto: SignInDto) { 

  }

  async signUp(signUpDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    try {
      const user = await this._usersService.create({
        ...signUpDto,
        password: hashedPassword,
      });

      const token = await this._signJwt(user.id);

      return { token, user };

    } catch (error: any) {
      if (error.code === 11000) {
        throw new UnauthorizedException('Пользователь с таким email уже существует');
      }

    }
  }


  getMe() {
            
  }

  private async _signJwt(userId: number): Promise<string> {
    return this._jwtService.signAsync({ sub: userId });
  }
  
}
