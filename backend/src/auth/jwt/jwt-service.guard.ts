import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTokenEntity } from 'src/entites/user_token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtServiceAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(UserTokenEntity)
    private user_token: Repository<UserTokenEntity>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const accessToken = request.cookies['shop_access_token'];
    const refreshToken = request.cookies['shop_refresh_token'];
    const device_id = request.headers['device-id'];

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    try {
      // access_token 검증
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });
      request.user = payload.user_id
      return true
    } catch (error) {
      console.error(error);
    }

    if (!refreshToken) {
      throw new UnauthorizedException('refresh_token이 존재하지 않습니다. 로그인을 해 주세요.');
    }

    console.log(request.user)

    // refresh_token이 db에 저장되어 있는 토큰과 일치하는지 확인
    const storeToken = await this.user_token.findOne({
      where: {
        user_id: request.user,
        device_id: device_id,
        token: refreshToken,
      },
    });
    console.log(storeToken)

    if(!storeToken) {
        throw new UnauthorizedException();
    } else {
      try {
        // refresh_toekn 검증
        const payloadRefreshToken = await this.jwtService.verifyAsync(
          refreshToken,
          { secret: this.configService.get<string>('JWT_SECRET_KEY') },
        );

        // access_token이 만료되었을 경우 refresh_token을 통해 새 토큰을 발급
        const newAccessToken = this.jwtService.sign(
          {
            user_id: payloadRefreshToken.user_id,
            email: payloadRefreshToken.email,
            name: payloadRefreshToken.name,
          },
          {
            secret: this.configService.get<string>('JWT_SECRET_KEY'),
            expiresIn: '1h',
          },
        );

        response.cookie('shop_access_token', newAccessToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
        });

        request.user = payloadRefreshToken;
        return true;
      } catch (error) {
        // 만약 이 과정에서 refresh_token이 만료되었을 경우 db에서 토큰을 삭제
        await this.user_token.delete({
          user_id: request?.user.user_id,
          device_id: device_id,
        });

        response.clearCookie('shop_access_token');
        response.clearCookie('shop_refresh_token');

        throw new UnauthorizedException(
          '토큰이 만료되었습니다. 다시 로그인해 주세요.',
        );
      }
    }
  }
}
