import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './../products/product.entity';
import { ProductsModule } from './../products/products.module';
import { NearbyProductsController } from './nearbyProducts.controller';
import { NearbyProductsRepository } from './nearbyProducts.repository';
import { NearbyProductsService } from './nearbyProducts.service';

@Module({
imports: [TypeOrmModule.forFeature([Product]), ProductsModule],
  controllers: [NearbyProductsController],
  providers: [NearbyProductsService, NearbyProductsRepository]
})
export class NearbyProductsModule {}