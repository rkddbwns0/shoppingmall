import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpUserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entites/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly user: Repository<UserEntity>,
  ) {}

  async checkDuplicate(email?: string, phone?: string, nickname?: string) {
    try {
      const result: { email?: string; phone?: string; nickname?: string } = {};

      if (email) {
        const emailResult = await this.checkEmail(email);
        result.email = emailResult.message || emailResult.ErrorMessage;
      }

      if (phone) {
        const phoneResult = await this.checkPhone(phone);
        result.phone = phoneResult.message || phoneResult.ErrorMessage;
      }

      if (nickname) {
        const nicknameResult = await this.checkNickname(nickname);
        result.nickname = nicknameResult.message || nicknameResult.ErrorMessage;
      }

      return result;
    } catch (error) {
      return { message: error.message };
    }
  }

  private async checkEmail(email: string) {
    try {
      const dupEmail = await this.user.findOne({ where: { email: email } });

      if (dupEmail) {
        throw new BadRequestException('이미 사용 중인 이메일 입니다.');
      }
      return { message: '사용 가능한 이메일입니다.' };
    } catch (error) {
      return { ErrorMessage: error.message };
    }
  }

  private async checkPhone(phone: string) {
    try {
      const dupPhone = await this.user.findOne({ where: { phone: phone } });

      if (dupPhone) {
        throw new BadRequestException('이미 가입된 연락처입니다.');
      }
      return { message: '사용 가능한 연락처입니다.' };
    } catch (error) {
      return { ErrorMessage: error.message };
    }
  }

  private async checkNickname(nickname: string) {
    try {
      const dupNickname = await this.user.findOne({
        where: { nickname: nickname },
      });

      if (dupNickname) {
        throw new BadRequestException('이미 사용 중인 닉네임입니다.');
      }

      return { message: '사용 가능한 닉네임입니다.' };
    } catch (error) {
      return { ErrorMessage: error.message };
    }
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async signupUser(signupUserDto: SignUpUserDto) {
    try {
      const signup = await this.user.create(signupUserDto);
      const saveSignup = await this.user.save(signup);

      if (!saveSignup) {
        throw new BadRequestException(
          '회원가입에 실패하였습니다. 입력한 정보를 다시 확인해 주세요.',
        );
      }

      return { suceess: true, message: '회원가입에 성공하였습니다.' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
