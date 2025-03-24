import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entites/user.entity';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { JwtServiceStrategy } from './jwt-service.strategy';
import { UserTokenEntity } from 'src/entites/user_token.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtServiceAuthGuard } from './jwt-service.guard';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserTokenEntity]),
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    UserService,
    JwtServiceStrategy,
    { provide: APP_GUARD, useClass: JwtServiceAuthGuard },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
