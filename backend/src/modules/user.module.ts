import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/jwt/jwt.module';
import { UserController } from 'src/controller/user.controller';
import { UserEntity } from 'src/entites/user.entity';
import { UserTokenEntity } from 'src/entites/user_token.entity';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserTokenEntity]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
