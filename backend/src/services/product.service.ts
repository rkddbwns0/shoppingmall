import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { RegProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { ProductEntity } from 'src/entites/product.entity';
import { ProductCateogryEntity } from 'src/entites/product_categories.entity';
import { Product_optionEntity } from 'src/entites/product_option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(ProductCateogryEntity)
    private readonly productCategoryRepository: Repository<ProductCateogryEntity>,

    @InjectRepository(Product_optionEntity)
    private readonly product_optionRepository: Repository<Product_optionEntity>,

    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async randomProduct(): Promise<ProductEntity[]> {
    try {
      const cacheKey = process.env.CACHE_KEY;

      const cacheData = await this.cacheManager.get<ProductEntity[]>(cacheKey);
      if (cacheData) {
        console.log(cacheData);
        return cacheData;
      }

      const result = await this.productRepository
        .createQueryBuilder('product')
        .leftJoin(
          'like_product',
          'like_product',
          'like_product.product_no = product.product_id',
        )
        .select([
          'product.brand AS brand',
          'product.product_id AS product_id',
          'product.product_name AS product_name',
          'product.price AS price',
          'IFNULL(COUNT(like_product.product_no), 0) AS like_product',
        ])
        .groupBy('product.product_id')
        .orderBy('RAND()')
        .limit(5)
        .getRawMany();

      await this.cacheManager.set(cacheKey, result, 600);

      return result;
    } catch (error) {
      console.error(error);
    }
  }

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
      .leftJoin(
        'like_product',
        'like_product',
        'like_product.product_no = product.product_id',
      )
      .where('product.product_category IN (:...categoryResult)', {
        categoryResult,
      })
      .select([
        'product',
        'IFNULL(COUNT(review.product_no), 0) AS review_count',
        'IFNULL(ROUND(AVG(review.scope), 1), 0) AS review_scope',
        'IFNULL(COUNT(like_product.product_no), 0) as liked_count',
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
        .leftJoin(
          'product.product_option',
          'product_option',
          'product_option.product_no = product.product_id',
        )
        .leftJoin(
          (qb) =>
            qb
              .select('review.product_no', 'product_no')
              .addSelect('COUNT(review.product_no) AS review_count')
              .addSelect('AVG(review.scope) AS review_scope')
              .from('review', 'review')
              .groupBy('review.product_no'),
          'review',
          'review.product_no = product.product_id',
        )
        .leftJoin(
          (qd) =>
            qd
              .select('qna.product_no', 'product_no')
              .addSelect('COUNT(qna.product_no) AS qna_count')
              .from('qna', 'qna')
              .groupBy('qna.product_no'),
          'qna',
          'qna.product_no = product.product_id',
        )
        .leftJoin(
          (qb) =>
            qb
              .select('like_product.product_no', 'product_no')
              .addSelect('COUNT(like_product.product_no) AS liked_count')
              .from('like_product', 'like_product')
              .groupBy('like_product.product_no'),
          'like_product',
          'like_product.product_no = product.product_id',
        )
        .where('product.product_id = :product_id', { product_id })
        .select([
          'product.brand AS brand',
          'product.product_name AS product_name',
          'product.product_content AS product_content',
          'product.gender AS gender',
          'product.price AS price',
          'product.sale_price AS sale_price',
          'IFNULL(product_option.color, "") AS color',
          'IFNULL(product_option.size, "") AS size',
          'IFNULL(product_option.stock, 0) AS stock',
          'IFNULL(review.review_count, 0) AS review_count',
          'IFNULL(ROUND(review.review_scope, 1), 0) AS review_scope',
          'IFNULL(qna.qna_count, 0) AS qna_count',
          'IFNULL(like_product.liked_count, 0) as liked_count',
        ])
        .getRawMany();

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

    try {
      const result = await this.productRepository.create(productData);
      await this.productRepository.save(result);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  async insertProductOption() {}

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
