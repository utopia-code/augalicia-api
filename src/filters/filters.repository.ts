import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/common/enums/role.enum";
import { ActiveUserInterface } from "src/common/interfaces/active-user.interface";
import { Repository } from "typeorm";
import { AccesibilityDto } from "./dtos/accesibility.dto";
import { ComplementaryTechniqueDto } from "./dtos/complementary-technique.dto";
import { ServiceDto } from "./dtos/service.dto";
import { TermalTechniqueDto } from "./dtos/termal-technique.dto";
import { TreatmentDto } from "./dtos/treatment.dto";
import { TypeProductDto } from "./dtos/type-product.dto";
import { TypeTermalCentreDto } from "./dtos/type-termal-centre.dto";
import { TypeWaterDto } from "./dtos/type-water.dto";
import { Accesibility } from "./entities/accesibility.entity";
import { ComplementaryTechnique } from "./entities/complementary-technique.entity";
import { Service } from "./entities/services.entity";
import { TermalTechnique } from "./entities/termal-technique.entity";
import { Treatment } from "./entities/treatment.entity";
import { TypeProduct } from "./entities/type-product.entity";
import { TypeTermalCentre } from "./entities/type-termal-centre.entity";
import { TypeWater } from "./entities/type-water.entity";

@Injectable()
export class FiltersRepository {
    constructor(
        @InjectRepository(TypeProduct)
        private typeProductRepository: Repository<TypeProduct>,

        @InjectRepository(TypeTermalCentre)
        private typeTermalCentreRepository: Repository<TypeTermalCentre>,

        @InjectRepository(TermalTechnique)
        private termalTechniqueRepository: Repository<TermalTechnique>,

        @InjectRepository(TypeWater)
        private typeWaterRepository: Repository<TypeWater>,

        @InjectRepository(Treatment)
        private treatmentRepository: Repository<Treatment>,

        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,

        @InjectRepository(Accesibility)
        private accesibilityRepository: Repository<Accesibility>,

        @InjectRepository(ComplementaryTechnique)
        private complementaryTechniqueRepository: Repository<ComplementaryTechnique>
    ) {}

    private validateOwnership(user: ActiveUserInterface) {
        if (user.role !== Role.ADMIN) {
            throw new UnauthorizedException();
        }
    }

    async createTypeProduct(
        typeProductDto: TypeProductDto,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);
        await this.checkIfExists(this.typeProductRepository, typeProductDto.name);
        const newTypeProduct = this.typeProductRepository.create(typeProductDto);
        return this.typeProductRepository.save(newTypeProduct);
    }

    getAllTypeProducts() {
        return this.typeProductRepository.find()
    }

    async createTypeTermalCentre(
        typeTermalCentreDto: TypeTermalCentreDto,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);
        await this.checkIfExists(this.typeTermalCentreRepository, typeTermalCentreDto.name);
        const typeTermalCentre = this.typeTermalCentreRepository.create(typeTermalCentreDto);
        return this.typeTermalCentreRepository.save(typeTermalCentre);
    }

    getAllTypeTermalCentres() {
        return this.typeTermalCentreRepository.find()
    }

    async createTermalTechnique(
        termalTechniqueDto: TermalTechniqueDto,
        user: ActiveUserInterface
    ) {
        await this.checkIfExists(this.termalTechniqueRepository, termalTechniqueDto.name);
        const termalTechnique = this.termalTechniqueRepository.create(termalTechniqueDto);
        return this.termalTechniqueRepository.save(termalTechnique);
    }

    getAllTermalTechniques() {
        return this.termalTechniqueRepository.find()
    }

    async createTypeWater(
        typeWaterDto: TypeWaterDto,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);
        await this.checkIfExists(this.typeWaterRepository, typeWaterDto.name);
        const typeWater = this.typeWaterRepository.create(typeWaterDto);
        return this.typeWaterRepository.save(typeWater);
    }

    getAllTypeWaters() {
        return this.typeWaterRepository.find()
    }

    async createTreatment(
        treatmentDto: TreatmentDto,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);
        await this.checkIfExists(this.treatmentRepository, treatmentDto.name);
        const treatment = this.treatmentRepository.create(treatmentDto);
        return this.treatmentRepository.save(treatment);
    }

    getAllTreatments() {
        return this.treatmentRepository.find()
    }

    async createService(
        serviceDto: ServiceDto,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);
        await this.checkIfExists(this.serviceRepository, serviceDto.name);
        const service = this.serviceRepository.create(serviceDto);
        return this.serviceRepository.save(service);
    }

    getAllServices() {
        return this.serviceRepository.find()
    }

    async createAccesibility(
        accesibilityDto: AccesibilityDto,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);
        await this.checkIfExists(this.accesibilityRepository, accesibilityDto.name);
        const accesibility = this.accesibilityRepository.create(accesibilityDto);
        return this.accesibilityRepository.save(accesibility);
    }

    getAllAccesibility() {
        return this.accesibilityRepository.find()
    }

    async createComplementaryTechnique(
        complementaryTechniqueDto: ComplementaryTechniqueDto,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);
        await this.checkIfExists(this.complementaryTechniqueRepository, complementaryTechniqueDto.name);
        const complementaryTechnique = this.complementaryTechniqueRepository.create(complementaryTechniqueDto);
        return this.complementaryTechniqueRepository.save(complementaryTechnique);
    }

    getAllComplementaryTechniques() {
        return this.complementaryTechniqueRepository.find()
    }

    private async checkIfExists(repository: Repository<any>, value: string) {
        const existingItem = await repository.findOne({ where: { name: value } });
        if (existingItem) {
            throw new BadRequestException(`${value} already exists`);
        }
    }
}