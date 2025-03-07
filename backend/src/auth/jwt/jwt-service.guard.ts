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
    private jwtSerivce: JwtService,
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
      const payload = await this.jwtSerivce.verifyAsync(accessToken, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });

      request.user = payload;
      return true;
    } catch (error) {
      console.error('토큰이 존재하지 않습니다.');
    }

    if (!refreshToken) {
      throw new UnauthorizedException('refresh_token이 존재하지 않습니다.');
    }

    const storeToken = await this.user_token.findOne({
      where: {
        user_id: request?.user?.user_id,
        device_id: device_id,
        token: refreshToken,
      },
    });

    try {
      const payloadRefreshToken = await this.jwtSerivce.verifyAsync(
        refreshToken,
        { secret: this.configService.get<string>('JWT_SECRET_KEY') },
      );

      const newAccessToken = await this.jwtSerivce.sign(
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
