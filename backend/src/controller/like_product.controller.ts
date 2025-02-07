import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Press_likedDto } from 'src/dto/like_product.dto';
import { Like_ProductService } from 'src/services/like_product.service';

@Controller('like_product')
export class Like_ProductController {
  constructor(private readonly like_productService: Like_ProductService) {}

  @Post('/press_liked')
  async press_liked(
    @Body() press_likedDto: Press_likedDto,
    @Res() res: Response,
  ) {
    try {
      const checkData =
        await this.like_productService.checkData(press_likedDto);
      if (checkData.check === true) {
        const result =
          await this.like_productService.press_liked(press_likedDto);
        if (result.success === true) {
          res.status(200).json({ message: result.message });
        } else {
          res.status(403).json({ message: result.message });
        }
      } else {
        res.status(403).json({ message: checkData.message });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
