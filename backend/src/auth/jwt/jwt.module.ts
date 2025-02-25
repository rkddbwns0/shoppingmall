import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entites/user.entity';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { JwtServiceStrategy } from './jwt-service.strategy';
import { UserTokenEntity } from 'src/entites/user_token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserTokenEntity]),
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, UserService, JwtServiceStrategy],
  exports: [AuthService],
})
export class AuthModule {}
