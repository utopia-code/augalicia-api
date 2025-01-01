import { Injectable } from '@nestjs/common';
import { ActiveUserInterface } from './../common/interfaces/active-user.interface';
import { AccesibilityDto } from './dtos/accesibility.dto';
import { ComplementaryTechniqueDto } from './dtos/complementary-technique.dto';
import { ServiceDto } from './dtos/service.dto';
import { TermalTechniqueDto } from './dtos/termal-technique.dto';
import { TreatmentDto } from './dtos/treatment.dto';
import { TypeProductDto } from './dtos/type-product.dto';
import { TypeTermalCentreDto } from './dtos/type-termal-centre.dto';
import { TypeWaterDto } from './dtos/type-water.dto';
import { FiltersRepository } from './filters.repository';

@Injectable()
export class FiltersService {
    constructor(
        private filtersRepository: FiltersRepository
    ) {}

    async createTypeProduct(
        typeProductDto: TypeProductDto,
        user: ActiveUserInterface
    ) {
        return await this.filtersRepository.createTypeProduct(typeProductDto, user);
    }

    async getAllTypeProducts() {
        return await this.filtersRepository.getAllTypeProducts();
    }

    async createTypeTermalCentre(
        typeTermalCentreDto: TypeTermalCentreDto,
        user: ActiveUserInterface
    ) {
        return await this.filtersRepository.createTypeTermalCentre(typeTermalCentreDto, user);
    }

    async getAllTypeTermalCentres() {
        return await this.filtersRepository.getAllTypeTermalCentres();
    }

    async createTermalTechnique(
        termalTechniqueDto: TermalTechniqueDto,
        user: ActiveUserInterface
    ) {
        return await this.filtersRepository.createTermalTechnique(termalTechniqueDto, user);
    }

    async getAllTermalTechniques() {
        return await this.filtersRepository.getAllTermalTechniques();
    }

    async createTypeWater(
        typeWaterDto: TypeWaterDto,
        user: ActiveUserInterface
    ) {
        return await this.filtersRepository.createTypeWater(typeWaterDto, user);
    }

    async getAllTypeWaters() {
        return await this.filtersRepository.getAllTypeWaters();
    }

    async createTreatment(
        treatmentDto: TreatmentDto,
        user: ActiveUserInterface
    ) {
        return await this.filtersRepository.createTreatment(treatmentDto, user);
    }

    async getAllTreatments() {
        return await this.filtersRepository.getAllTreatments();
    }

    async createService(
        serviceDto: ServiceDto,
        user: ActiveUserInterface
    ) {
        return await this.filtersRepository.createService(serviceDto, user);
    }

    async getAllServices() {
        return await this.filtersRepository.getAllServices();
    }

    async createAccesibility(
        accesibilityDto: AccesibilityDto,
        user: ActiveUserInterface
    ) {
        return await this.filtersRepository.createAccesibility(accesibilityDto, user);
    }

    async getAllAccesibility() {
        return await this.filtersRepository.getAllAccesibility();
    }

    async createComplementaryTechnique(
        complementaryTechniqueDto: ComplementaryTechniqueDto,
        user: ActiveUserInterface
    ) {
        return await this.filtersRepository.createComplementaryTechnique(complementaryTechniqueDto, user);
    }

    async getAllComplementaryTechniques() {
        return await this.filtersRepository.getAllComplementaryTechniques();
    }
}
