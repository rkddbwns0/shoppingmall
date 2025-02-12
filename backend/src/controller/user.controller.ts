import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { SignUpUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입 중복 검사 라우터' })
  @Post('/duplicate_user')
  async duplicateUser(
    @Body() body: { email?: string; phone?: string; nickname?: string },
    @Res() res: Response,
  ) {
    try {
      const result = await this.userService.checkDuplicate(
        body?.email,
        body?.phone,
        body?.nickname,
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

      if (result.success === true) {
        res.status(201).json({ message: result.message });
      } else {
        return res.status(400).json({ message: result.message });
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
