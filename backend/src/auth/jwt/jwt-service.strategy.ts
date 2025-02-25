import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtServiceStrategy extends PassportStrategy(
  Strategy,
  'jwt-service',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
      ignoreExpiration: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.token;
        },
      ]),
    });
  }

  async vaildate(payload: any) {
    return {
      email: payload.email,
      name: payload.name,
      nickname: payload.nickname,
    };
  }
}
