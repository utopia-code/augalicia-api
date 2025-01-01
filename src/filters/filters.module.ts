import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../auth/auth.module';
import { Accesibility } from './entities/accesibility.entity';
import { ComplementaryTechnique } from './entities/complementary-technique.entity';
import { Service } from './entities/services.entity';
import { TermalTechnique } from './entities/termal-technique.entity';
import { Treatment } from './entities/treatment.entity';
import { TypeProduct } from './entities/type-product.entity';
import { TypeTermalCentre } from './entities/type-termal-centre.entity';
import { TypeWater } from './entities/type-water.entity';
import { FiltersController } from './filters.controller';
import { FiltersRepository } from './filters.repository';
import { FiltersService } from './filters.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    TypeProduct, 
    TypeTermalCentre, 
    TermalTechnique, 
    TypeWater,
    Treatment,
    Service,
    Accesibility,
    ComplementaryTechnique
  ]),
  AuthModule],
  controllers: [FiltersController],
  providers: [FiltersService, FiltersRepository],
  exports: [TypeOrmModule]
})
export class FiltersModule {}
