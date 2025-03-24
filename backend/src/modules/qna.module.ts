import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QnAController } from 'src/controller/qna.controller';
import { ProductEntity } from 'src/entites/product.entity';
import { QnAEntity } from 'src/entites/qna.entity';
import { UserEntity } from 'src/entites/user.entity';
import { QnAService } from 'src/services/qna.service';
import { UserTokenEntity } from '../entites/user_token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProductEntity, QnAEntity, UserTokenEntity])],
  controllers: [QnAController],
  providers: [QnAService],
})
export class QnAModoule {}
