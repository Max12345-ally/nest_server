import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtDualGuard implements CanActivate {
  constructor(private readonly _jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // 1. Попытка взять токен из Authorization header
    let token: string | undefined = this._extractTokenFromHeader(req);

    // 2. Если нет — берём из cookie
    if (!token) {
      token = req.cookies?.jwt;
    }

    if (!token) {
      throw new UnauthorizedException('JWT токен не обнаружен в cookie и header заголовке');
    }

    try {
      const payload = await this._jwtService.verifyAsync(token);
      req.user = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Невалидный JWT токен');
    }
  }

  private _extractTokenFromHeader(req: any): string | undefined {
    const auth = req.headers['authorization'];
    if (!auth) return undefined;

    const [type, token] = auth.split(' ');
    if (type !== 'Bearer' || !token) return undefined;


    return token;
  }
}
