import { Injectable } from '@nestjs/common';
import { ActiveUserInterface } from './../common/interfaces/active-user.interface';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
    constructor(
        private productsRepository: ProductsRepository
    ) {}

    async createProduct(
        createProductDto: CreateProductDto,
        user: ActiveUserInterface
    ) {
        return await this.productsRepository.createProduct(createProductDto, user);
    }

    async findAllProductsByUser(user: ActiveUserInterface) {
        return await this.productsRepository.findAllProductsByUser(user);
    }

    async updateProduct(
        id: number, 
        updateProductDto: UpdateProductDto,
        user: ActiveUserInterface
    ) {
        return await this.productsRepository.updateProduct(id, updateProductDto, user);
    }

    async removeProduct(
        id: number,
        user: ActiveUserInterface
    ) {
        return await this.productsRepository.removeProduct(id, user);
    }

    async getProductById(id: number) {
        return await this.productsRepository.getProductById(id);
    }

    async getTermalTechniquesOfProductById(id: number) {
        return await this.productsRepository.getTermalTechniquesOfProductById(id);
    }

    async getTreatmentsOfProductById(id: number) {
        return await this.productsRepository.getTreatmentsOfProductById(id);
    }

    async getServicesOfProductById(id: number) {
        return await this.productsRepository.getServicesOfProductById(id);
    }

    async getAccesibilityOfProductById(id: number) {
        return await this.productsRepository.getAccesibilityOfProductById(id);
    }

    async getComplementaryTechniquesOfProductById(id: number) {
        return await this.productsRepository.getComplementaryTechniquesOfProductById(id);
    }

    async findOneProductByUserWithRelations(
        id: number, 
        user: ActiveUserInterface
    ) {
        return await this.productsRepository.findOneProductByUserWithRelations(id, user);
    }

    async findAllProducts() {
        return await this.productsRepository.findAllProducts();
    }

    async findAllProductsByTypeProduct(id: number) {
        return await this.productsRepository.findAllProductsByTypeProduct(id);
    }

    async findAllProductsByTypeTermalCentre(id: number) {
        return await this.productsRepository.findAllProductsByTypeTermalCentre(id);
    }

    async findAllProductsByTermalTechnique(id: number) {
        return await this.productsRepository.findAllProductsByTermalTechnique(id);
    }

    async findAllProductsByTypeWater(id: number) {
        return await this.productsRepository.findAllProductsByTypeWater(id);
    }

    async findAllProductsByTreatment(id: number) {
        return await this.productsRepository.findAllProductsByTreatment(id);
    }

    async findAllProductsByService(id: number) {
        return await this.productsRepository.findAllProductsByService(id);
    }

    async findAllProductsByAccesibility(id: number) {
        return await this.productsRepository.findAllProductsByAccesibility(id);
    }

    async findAllProductsByComplementaryTechnique(id: number) {
        return await this.productsRepository.findAllProductsByComplementaryTechnique(id);
    }
}
