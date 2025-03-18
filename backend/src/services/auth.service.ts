import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, LogoutDto } from 'src/dto/auth.dto';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserTokenEntity } from 'src/entites/user_token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,

    @InjectRepository(UserTokenEntity)
    private readonly user_token: Repository<UserTokenEntity>,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const caluateExpriryDate = () => {
      const now = new Date();
      now.setDate(now.getDate() + 7);
      return now;
    };

    const user = await this.vaildateServiceUser(loginDto);
    const accessToken = await this.accessTokenService(user);
    const refreshToken = await this.refreshTokenService(user);

    const user_info = {
      email: user.email,
      name: user.name,
    };

    const findToken = await this.user_token.findOne({
      where: { user_id: user.user_id, token: refreshToken },
    });

    if (!findToken) {
      const newToken = this.user_token.create({
        user_id: user.user_id,
        token: refreshToken,
        device_id: loginDto.device_id,
        expires_at: caluateExpriryDate(),
      });
      await this.user_token.save(newToken);
    }

    return { accessToken, refreshToken, user_info };
  }

  async vaildateServiceUser(loginDto: LoginDto) {
    try {
      const findUser = await this.user.findOne({
        where: { email: loginDto.email },
      });

      if (!findUser) {
        throw new ForbiddenException('가입되지 않은 유저입니다.');
      }

      if (!(await bcrypt.compare(loginDto.password, findUser.password))) {
        throw new ForbiddenException('비밀번호가 일치하지 않습니다.');
      }

      return findUser;
    } catch (error) {
      console.error(error);
    }
  }

  async accessTokenService(user: UserEntity) {
    const payload = {
      user_id: user.user_id,
      email: user.email,
      name: user.name,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    return accessToken;
  }

  async refreshTokenService(user: UserEntity) {
    const payload = {
      user_id: user.user_id,
      email: user.email,
      name: user.name,
    };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return refreshToken;
  }

  async logout(logoutDto: LogoutDto) {
    try {
      const user = await this.user.findOne({
        where: { email: logoutDto.email },
        select: ['user_id'],
      });

      await this.user_token.delete({
        user_id: user.user_id,
        device_id: logoutDto.device_id,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
