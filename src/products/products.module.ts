import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { FeaturesModule } from 'src/features/features.module';
import { TypeProduct } from 'src/filters/entities/type-product.entity';
import { FiltersModule } from 'src/filters/filters.module';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, TypeProduct]), FiltersModule, FeaturesModule, AuthModule, FavouritesModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsRepository, TypeOrmModule]
})
export class ProductsModule {}
