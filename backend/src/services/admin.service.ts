import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminLoginDto, CreateAdminDto } from 'src/dto/admin.dto';
import { AdminEntity } from 'src/entites/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly admin: Repository<AdminEntity>,
  ) {}

  async duplicateEmail(email: string) {
    let admin = await this.admin.findOne({
      where: { email: email },
    });

    if (admin) {
      throw new BadRequestException('이미 가입된 계정입니다.');
    }
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 11);
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    try {
      const createAdmin = await this.admin.create(createAdminDto);
      await this.admin.save(createAdmin);
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }

  async adminLogin(adminLogin: AdminLoginDto) {
    try {
      let admin = await this.admin.findOne({
        where: {
          email: adminLogin.email,
        },
      });

      if (!admin) {
        throw new BadRequestException('존재하지 않은 관리자 정보입니다.');
      }

      const comparePassword = await bcrypt.compare(
        adminLogin.password,
        admin.password,
      );

      if (!comparePassword) {
        throw new BadRequestException('비밀번호가 일치하지 않습니다.');
      }

      return { login_success: true };
    } catch (error) {
      console.error(error);
    }
  }
}
