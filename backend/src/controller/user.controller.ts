import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Public } from 'src/auth/decorator/public.decorator';
import { JwtServiceAuthGuard } from 'src/auth/jwt/jwt-service.guard';
import { LoginDto, LogoutDto } from 'src/dto/auth.dto';
import { SignUpUserDto } from 'src/dto/user.dto';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '회원가입 중복 검사 라우터' })
  @Post('/duplicate_user')
  async duplicateUser(
    @Body() body: { email?: string; phone?: string },
    @Res() res: Response,
  ) {
    try {
      const result = await this.userService.checkDuplicate(
        body?.email,
        body?.phone,
      );
      res.status(200).json(result);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: '회원가입 라우터' })
  @Post('/signup')
  async signup(@Body() signupUserDto: SignUpUserDto, @Res() res: Response) {
    try {
      const hashPassword = await this.userService.hashPassword(
        signupUserDto.password,
      );
      signupUserDto.password = hashPassword;

      const result = await this.userService.signupUser(signupUserDto);

      return res
        .status(result.success ? 201 : 400)
        .json({ message: result.message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: '서버에러입니다.' });
    }
  }

  @ApiOperation({ summary: '로그인 라우터' })
  @Public()
  @UseGuards(JwtServiceAuthGuard)
  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const deviceId = req.headers['device-id'];

      if (Array.isArray(deviceId)) {
        loginDto.device_id = deviceId[0];
      } else {
        loginDto.device_id = deviceId;
      }

      const token = await this.authService.login(loginDto);

      res.cookie('shop_access_token', token.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });

      res.cookie('shop_refresh_token', token.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });

      res
        .status(HttpStatus.OK)
        .json({ message: '로그인 성공', data: token.user_info });

      return;
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({ summary: '로그인 상태 유지를 위한 인증 라우터' })
  @UseGuards(JwtServiceAuthGuard)
  @Get('/me')
  async getProfile(@Req() req) {
    try {
      return {
        email: req.user.email,
        name: req.user.name,
      };
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({ summary: '로그아웃 라우터' })
  @Public()
  @Post('/logout')
  async logout(
    @Res() res: Response,
    @Body() logoutDto: LogoutDto,
    @Req() req: Request,
  ) {
    const deviceId = req.headers['device-id'];

    if (Array.isArray(deviceId)) {
      logoutDto.device_id = deviceId[0];
    } else {
      logoutDto.device_id = deviceId;
    }

    await this.authService.logout(logoutDto);
    res.clearCookie('shop_access_token');
    res.clearCookie('shop_refresh_token');
    res.status(200).send();
    return { message: '로그아웃' };
  }
}
