import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../auth/auth.module';
import { ProductsModule } from './../products/products.module';
import { Favourite } from './entities/favourite.entity';
import { FavouritesController } from './favourites.controller';
import { FavouritesRepository } from './favourites.repository';
import { FavouritesService } from './favourites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favourite]), 
    forwardRef(() => ProductsModule),
    AuthModule
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService, FavouritesRepository],
  exports: [TypeOrmModule]
})
export class FavouritesModule {}
