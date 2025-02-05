import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminEntity } from './entites/admin.entity';
import { AdminModule } from './admin/modules/admin.moule';
import { UserEntity } from './entites/user.entity';
import { ProductEntity } from './entites/product.entity';
import { ProductCateogryEntity } from './entites/product_categories.entity';
import { ProductModule } from './modules/product.module';
import { CartModule } from './modules/cart.module';
import { CartEntity } from './entites/cart.entity';
import { AddressEntity } from './entites/address.entity';
import { AddressModule } from './modules/address.module';
import { OrderEntity } from './entites/order.entity';
import { OrderItemEntity } from './entites/orderItem.entity';
import { OrderModule } from './modules/order.module';
import { ReviewEntity } from './entites/review.entity';
import { ReviewModule } from './modules/review.module';
import { QnAEntity } from './entites/qna.entity';
import { QnAModoule } from './modules/qna.module';
import { QnA_AnswerEntity } from './entites/qna_answer.entity';
import { QnA_AnswerModule } from './admin/modules/qna_answer.module';
import { OrderMngModule } from './admin/modules/order_mng.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        charset: 'utf8mb4',
        synchronize: true,
        retryAttempts: 1,
        retryDelay: 3000,
        entities: [
          AdminEntity,
          UserEntity,
          ProductEntity,
          ProductCateogryEntity,
          CartEntity,
          AddressEntity,
          OrderEntity,
          OrderItemEntity,
          ReviewEntity,
          QnAEntity,
          QnA_AnswerEntity,
        ],
      }),
    }),
    AdminModule,
    QnA_AnswerModule,
    ProductModule,
    CartModule,
    AddressModule,
    OrderModule,
    ReviewModule,
    QnAModoule,
    OrderMngModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
