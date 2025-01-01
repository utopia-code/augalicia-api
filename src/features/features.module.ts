import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { Image } from './entities/image.entity';
import { Notification } from './entities/notification.entity';
import { OpeningSeason } from './entities/opening-season.entity';
import { FeaturesController } from './features.controller';
import { FeaturesRepository } from './features.repository';
import { FeaturesService } from './features.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OpeningSeason,
      Image,
      Notification,
      Product
    ]),
  ],
  controllers: [FeaturesController],
  providers: [FeaturesService, FeaturesRepository],
  exports: [TypeOrmModule]
})
export class FeaturesModule {}
