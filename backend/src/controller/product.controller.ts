import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { RegProductDto, UpdateProductDto } from 'src/dto/product.dto';

import { ProductService } from 'src/services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: '10분마다 랜덤한 상품 데이터 5개를 가져옴' })
  @Get('/random_product')
  async randomProduct(@Res() res: Response) {
    try {
      const result = await this.productService.randomProduct();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({
    summary: 'product_category 테이블에 해당 번호의 자식 데이터를 가져옴',
  })
  @Get('select_category/:category_id')
  async selectProductCategory(@Param('category_id') category_id: number) {
    if (!category_id) {
      throw new BadRequestException('카테고리 넘버가 없습니다.');
    }
    return await this.productService.selectProductCategory(category_id);
  }

  @ApiOperation({ summary: '입력 받은 값에 대한 product 데이터 정보를 가져옴' })
  @Get('select_products/:product_category')
  async selectProduct(@Param('product_category') product_category: number) {
    if (!product_category) {
      throw new BadRequestException('카테고리 넘버가 없습니다.');
    }
    return await this.productService.selectProduct(product_category);
  }

  @ApiOperation({ summary: '특정 제품 정보 라우터' })
  @Get('select_product/:product_id')
  async selectOneProduct(@Param('product_id') product_id: number) {
    if (!product_id) {
      throw new BadRequestException(
        '제품 넘버가 없습니다. 다시 확인해 주세요.',
      );
    }

    return await this.productService.selectOneProduct(product_id);
  }

  @ApiOperation({ summary: '제품 등록 라우터' })
  @Post('insert')
  async insertProduct(
    @Body() regProductDto: RegProductDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.productService.insertProduct(regProductDto);
      if (result.success === true) {
        res
          .status(200)
          .json({ message: '제품 등록이 완료되었습니다.', result: result });
      } else {
        res.json(403).json({
          message:
            '데이터 등록에 실패하였습니다. 입력한 값을 다시 한 번 확인해 주세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  @ApiOperation({ summary: '제품 정보 수정 라우터' })
  @Put('update')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.productService.updateProduct(updateProductDto);
      if (result.success === true) {
        res.status(200).json({ message: '정보 수정이 완료되었습니다.' });
      } else {
        res.status(403).json({
          message: '정보 수정에 실패하였습니다. 정보를 다시 확인해 주세요.',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
