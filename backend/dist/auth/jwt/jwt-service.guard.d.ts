import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserTokenEntity } from 'src/entites/user_token.entity';
import { Repository } from 'typeorm';
export declare class JwtServiceAuthGuard implements CanActivate {
    private reflector;
    private jwtService;
    private configService;
    private user_token;
    constructor(reflector: Reflector, jwtService: JwtService, configService: ConfigService, user_token: Repository<UserTokenEntity>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private checkRefreshToken;
    private checkAccessToken;
}
