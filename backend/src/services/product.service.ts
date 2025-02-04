import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { ProductEntity } from 'src/entites/product.entity';
import { ProductCateogryEntity } from 'src/entites/product_categories.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(ProductCateogryEntity)
    private readonly productCategoryRepository: Repository<ProductCateogryEntity>,
  ) {}

  async selectProductCategory(
    category_id: number,
  ): Promise<ProductCateogryEntity[]> {
    const categoryResult = await this.productCategoryRepository.find({
      where: { parent_id: { category_id } },
      relations: ['children'],
    });

    if (!categoryResult) {
      throw new BadRequestException('정보가 없습니다.');
    }

    return categoryResult;
  }

  async selectProduct(product_category: number): Promise<ProductEntity[]> {
    const category = await this.productCategoryRepository
      .createQueryBuilder('product_category')
      .leftJoinAndSelect('product_category.children', 'children_category')
      .where(
        'product_category.parent_id = :parent_id OR product_category.category_id = :parent_id',
        {
          parent_id: product_category,
        },
      )
      .getMany();

    const categoryResult = category.map((category) => category.category_id);

    const ProductResult = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.product_category', 'category')
      .leftJoin('review', 'review', 'review.product_no = product.product_id')
      .where('product.product_category IN (:...categoryResult)', {
        categoryResult,
      })
      .select([
        'product',
        'IFNULL(COUNT(review.product_no), 0) AS review_count',
        'IFNULL(ROUND(AVG(review.scope), 1), 0) AS review_scope',
      ])
      .groupBy('product.product_id')
      .getRawMany();

    console.log(ProductResult);
    return ProductResult;
  }

  async selectOneProduct(product_id: number) {
    try {
      const selectProduct = await this.productRepository
        .createQueryBuilder('product')
        .leftJoin('review', 'review', 'review.product_no = product.product_id')
        .where('product.product_id = :product_id', { product_id })
        .select([
          'product',
          'IFNULL(COUNT(review.product_no), 0) AS review_count',
          'IFNULL(ROUND(AVG(review.scope), 1), 0) AS review_scope',
        ])
        .groupBy('product.product_id')
        .getRawOne();

      console.log(selectProduct);

      return selectProduct;
    } catch (error) {
      console.error(error);
    }
  }

  async insertProduct(regProductDto: RegProductDto) {
    const product_category = await this.productCategoryRepository.findOne({
      where: { category_id: regProductDto.product_category },
      select: ['category_id'],
    });

    const productData = {
      ...regProductDto,
      product_category,
    };

    console.log(productData);

    try {
      const result = await this.productRepository.create(productData);
      await this.productRepository.save(result);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const productId = await this.productRepository.findOne({
      where: { product_id: updateProductDto.product_id },
    });

    if (!productId) {
      throw new BadRequestException('존재하지 않는 제품 번호입니다.');
    }

    updateProductDto.product_id = productId.product_id;

    try {
      await this.productRepository.update(
        updateProductDto.product_id,
        updateProductDto,
      );
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
}
