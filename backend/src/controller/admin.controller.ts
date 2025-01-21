import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AdminLoginDto, CreateAdminDto } from 'src/dto/admin.dto';
import { AdminService } from 'src/services/admin.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: '관리자 생성 경로' })
  @Post('create')
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Res() res: Response,
  ) {
    try {
      await this.adminService.duplicateEmail(createAdminDto.email);

      const hashPassword = await this.adminService.hashPassword(
        createAdminDto.password,
      );
      createAdminDto.password = hashPassword;

      const result = await this.adminService.createAdmin(createAdminDto);
      if (result.success === true) {
        res.status(200).json({ message: '관리자 계정 생성 완료' });
      } else {
        res.status(403).json({ message: '생성 실패' });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({ summary: '관리자 로그인 경로' })
  @Post('admin_login')
  async adminLogin(@Body() adminLoginDto: AdminLoginDto, @Res() res: Response) {
    const result = await this.adminService.adminLogin(adminLoginDto);
    if (result.login_success === true) {
      res.status(200).json({ message: '로그인 성공' });
    } else {
      res.status(403).json({ message: '로그인 실패' });
    }
  }
}
