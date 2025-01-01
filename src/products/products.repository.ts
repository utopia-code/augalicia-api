import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { Role } from "src/common/enums/role.enum";
import { ActiveUserInterface } from "src/common/interfaces/active-user.interface";
import { Favourite } from "src/favourites/entities/favourite.entity";
import { Image } from "src/features/entities/image.entity";
import { Notification } from "src/features/entities/notification.entity";
import { OpeningSeason } from "src/features/entities/opening-season.entity";
import { Accesibility } from "src/filters/entities/accesibility.entity";
import { ComplementaryTechnique } from "src/filters/entities/complementary-technique.entity";
import { Service } from "src/filters/entities/services.entity";
import { TermalTechnique } from "src/filters/entities/termal-technique.entity";
import { Treatment } from "src/filters/entities/treatment.entity";
import { TypeProduct } from "src/filters/entities/type-product.entity";
import { TypeTermalCentre } from "src/filters/entities/type-termal-centre.entity";
import { TypeWater } from "src/filters/entities/type-water.entity";
import { In, Not, Repository } from "typeorm";
import { CreateProductDto } from "./dtos/create-product.dto";
import { ProductDto } from "./dtos/product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { Product } from "./product.entity";

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

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
        private complementaryTechniqueRepository: Repository<ComplementaryTechnique>,

        @InjectRepository(OpeningSeason)
        private openingSeasonRepository: Repository<OpeningSeason>,

        @InjectRepository(Image)
        private imageRepository: Repository<Image>,

        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,

        @InjectRepository(Favourite)
        private favouriteRepository: Repository<Favourite>
    ) {}

    private validateOwnership(product: Product, user: ActiveUserInterface) {
        if (user.role !== Role.ADMIN && product.userEmail !== user.email) {
            throw new UnauthorizedException();
        }
    }

    private async validateEntity(repo: Repository<any>, key: string, value: string | number, property: string) {
        const entity = await repo.findOneBy({ [key]: value });
        if (!entity) {
            throw new BadRequestException(`${property} not found`);
        }
        return entity;
    }

    private async validateEntities(repo: Repository<any>, key: string, values: string[], property: string) {
        if(!values) return [];
        // if(!values) return null;

        const entities = await repo.find({ where: { [key]: In(values) } });
        if (entities.length === 0) {
            throw new BadRequestException(`${property} not found`);
        }

        return entities
    }

    private async updateEntity<Entity>(
        currentValue: Entity, 
        newValue: string | string[] | number | undefined,
        repo: Repository<any>,
        key: string,
        property: string,
        isManyToMany: boolean = false
    ) {
        if(!newValue) return currentValue;
        if (isManyToMany) return await this.validateEntities(repo, key, newValue as string[], property)
        return await this.validateEntity(repo, key, newValue as string | number, property);
    }

    async createProduct(
        createProductDto: CreateProductDto,
        user: ActiveUserInterface
    ) {
        const typeProduct = await this.validateEntity(
            this.typeProductRepository, 'name', createProductDto.typeProduct, 'Type product'
        );
        const typeTermalCentre = await this.validateEntity(
            this.typeTermalCentreRepository, 'name', createProductDto.typeTermalCentre, 'Type termal centre'
        );
        const termalTechniques = await this.validateEntities(
            this.termalTechniqueRepository, 'name', createProductDto.termalTechniques, 'Termal technique'
        );
        const typeWaters = await this.validateEntities(
            this.typeWaterRepository, 'name', createProductDto.typeWaters, 'TYpe of water'
        );
        const treatments = await this.validateEntities(
            this.treatmentRepository, 'name', createProductDto.treatments, 'Treatment'
        );
        const services = await this.validateEntities(
            this.serviceRepository, 'name', createProductDto.services, 'Service'
        );
        const accesibility = await this.validateEntities(
            this.accesibilityRepository, 'name', createProductDto.accesibility, 'Accesibility'
        );
        const complementaryTechniques = await this.validateEntities(
            this.complementaryTechniqueRepository, 'name', createProductDto.complementaryTechniques, 'Complementary technique'
        );
        const openingSeason = await this.validateEntities(
            this.openingSeasonRepository, 'name', createProductDto.openingSeason, 'Opening season'
        );
        const images = createProductDto.images?.map((image) =>
            this.imageRepository.create({ name: image.name, url: image.url })
        ) || [];
        const notifications = createProductDto.notifications?.map((notification) =>
            this.notificationRepository.create({ 
                type: notification.type, 
                position: notification.position, 
                desc: notification.desc 
            })
        ) || [];

        const product = this.productRepository.create({
            ...createProductDto,
            typeProduct,
            typeTermalCentre,
            termalTechniques,
            typeWaters,
            treatments,
            services,
            accesibility,
            complementaryTechniques,
            openingSeason,
            images,
            notifications,
            userEmail: user.email
        });
        return this.productRepository.save(product);
    }

    async updateProduct(
        id: number, 
        updateProductDto: UpdateProductDto,
        user: ActiveUserInterface
    ) {
        const product = await this.findOneProductByUserWithRelations(id, user);

        const typeProduct = await this.updateEntity(
            product.typeProduct, updateProductDto.typeProduct, this.typeProductRepository, 'name', 'Type product'
        );
        const typeTermalCentre = await this.updateEntity(
            product.typeTermalCentre, updateProductDto.typeTermalCentre, this.typeTermalCentreRepository, 'name', 'Type termal centre'
        );
        const termalTechniques = await this.updateEntity(
            product.termalTechniques, updateProductDto.termalTechniques, this.termalTechniqueRepository, 'name',  'Termal technique', true
        );
        const typeWaters = await this.updateEntity(
            product.typeWaters, updateProductDto.typeWaters, this.typeWaterRepository, 'name', 'Type of water', true
        );
        const treatments = await this.updateEntity(
            product.treatments, updateProductDto.treatments, this.treatmentRepository, 'name', 'Treatment', true
        );
        const services = await this.updateEntity(
            product.services, updateProductDto.services, this.serviceRepository, 'name', 'Service', true
        );
        const accesibility = await this.updateEntity(
            product.accesibility, updateProductDto.accesibility, this.accesibilityRepository, 'name', 'Accesibility', true
        );
        const complementaryTechniques = await this.updateEntity(
            product.complementaryTechniques, updateProductDto.complementaryTechniques, this.complementaryTechniqueRepository, 'name', 'Complementary technique', true
        );
        const openingSeason = await this.updateEntity(
            product.openingSeason, updateProductDto.openingSeason, this.openingSeasonRepository, 'name', 'Opening season', true
        );

        Object.assign(product, {
            ...updateProductDto,
            typeProduct,
            typeTermalCentre,
            termalTechniques,
            typeWaters,
            treatments,
            services,
            accesibility,
            complementaryTechniques,
            openingSeason,
            notifications: [
                ...product.notifications,
                ...(updateProductDto.notifications || [])
            ],
            images: [
                ...product.images,
                ...(updateProductDto.images || [])
            ],
            userEmail: user.email
        });

        await this.productRepository.save(product);

        return product;
    }

    async removeProduct(id: number, user: ActiveUserInterface) {
        const product = await this.findOneProductByUser(id, user)

        await this.favouriteRepository.delete({ productId: id });

        return this.productRepository.remove(product);
    }

    async findOneProductByUser(id: number, user: ActiveUserInterface) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new BadRequestException(`${product} not found`);
        }

        this.validateOwnership(product, user);

        return product;
    }

    private async loadRelation(productId: number, relation: string) {
        const result = await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect(`product.${relation}`, relation)
            .where('product.id = :id', { id: productId })
            .getOne();
    
        return result ? result[relation] : null;
    }

    async findOneProductByUserWithRelations(id: number, user: ActiveUserInterface) {
        const product = await this.productRepository.findOne({
            where: { id },
        });

        if (!product) {
            throw new BadRequestException(`${product} not found`);
        }

        this.validateOwnership(product, user);

        product.typeProduct = await this.loadRelation(id, 'typeProduct');
        product.typeTermalCentre = await this.loadRelation(id, 'typeTermalCentre');
        product.termalTechniques = await this.loadRelation(id, 'termalTechniques');
        product.typeWaters = await this.loadRelation(id, 'typeWaters');
        product.treatments = await this.loadRelation(id, 'treatments');
        product.services = await this.loadRelation(id, 'services');
        product.accesibility = await this.loadRelation(id, 'accesibility');
        product.complementaryTechniques = await this.loadRelation(id, 'complementaryTechniques');
        product.openingSeason = await this.loadRelation(id, 'openingSeason');
        product.images = await this.loadRelation(id, 'images');
        product.notifications = await this.loadRelation(id, 'notifications');

        return product;
    }

    async findAllProductsByUser(user: ActiveUserInterface) {
        return await this.productRepository.find({
            where: { userEmail: user.email }
        });
    }

    async getProductById(id: number) {
        const product = await this.productRepository.findOne({
            where: { id },
        });

        if (!product) {
            throw new BadRequestException(`${product} not found`);
        }

        product.typeProduct = await this.loadRelation(id, 'typeProduct');
        product.typeTermalCentre = await this.loadRelation(id, 'typeTermalCentre');
        product.termalTechniques = await this.loadRelation(id, 'termalTechniques');
        product.typeWaters = await this.loadRelation(id, 'typeWaters');
        product.treatments = await this.loadRelation(id, 'treatments');
        product.services = await this.loadRelation(id, 'services');
        product.accesibility = await this.loadRelation(id, 'accesibility');
        product.complementaryTechniques = await this.loadRelation(id, 'complementaryTechniques');
        product.openingSeason = await this.loadRelation(id, 'openingSeason');
        product.images = await this.loadRelation(id, 'images');
        product.notifications = await this.loadRelation(id, 'notifications');

        return product;
    }
    async getTermalTechniquesOfProductById(id: number) {
        const product = await this.productRepository.findOne({ 
            where: { id },
            relations: [
                'termalTechniques'
            ],
        });
        if (!product) {
            throw new BadRequestException(`${product} not found`);
        }

        return product.termalTechniques;
    }

    async getTreatmentsOfProductById(id: number) {
        const product = await this.productRepository.findOne({ 
            where: { id },
            relations: [
                'treatments'
            ],
        });
        if (!product) {
            throw new BadRequestException(`${product} not found`);
        }

        return product.treatments;
    }

    async getServicesOfProductById(id: number) {
        const product = await this.productRepository.findOne({ 
            where: { id },
            relations: [
                'services'
            ],
        });
        if (!product) {
            throw new BadRequestException(`${product} not found`);
        }

        return product.services;
    }

    async getAccesibilityOfProductById(id: number) {
        const product = await this.productRepository.findOne({ 
            where: { id },
            relations: [
                'accesibility'
            ],
        });
        if (!product) {
            throw new BadRequestException(`${product} not found`);
        }

        return product.accesibility;
    }

    async getComplementaryTechniquesOfProductById(id: number) {
        const product = await this.productRepository.findOne({ 
            where: { id },
            relations: [
                'complementaryTechniques'
            ],
        });
        if (!product) {
            throw new BadRequestException(`${product} not found`);
        }

        return product.complementaryTechniques;
    }

    async findAllProducts() {
        const products = await this.productRepository.find({
            relations: ['images', 'typeProduct'],
            where: {
                typeProduct: {
                    name: 'TERMAL_WATER',
                },
            },
        });

        return plainToInstance(ProductDto, products);
    }

    async getProductsExcludingTermalWater() {
        const products = await this.productRepository.find({
            relations: ['images', 'typeProduct'],
            where: {
                typeProduct: {
                    name: Not('TERMAL_WATER'),
                },
            },
        });

        return plainToInstance(ProductDto, products);
    }

    async findAllProductsByTypeProduct(typeProductId: number) {
        const products = await this.productRepository.find({
            where: { typeProduct: { id: typeProductId } },
            relations: ['typeProduct'],
        });

        if (!products.length) {
            throw new BadRequestException('FILTERS.ERROR.FILTER');
        }

        return products
    }

    async findAllProductsByTypeTermalCentre(typeTermalCentreId: number) {
        const products = await this.productRepository.find({
            where: { typeTermalCentre: { id: typeTermalCentreId } },
            relations: ['typeTermalCentre', 'images'],
        });

        if (!products.length) {
            throw new BadRequestException('FILTERS.ERROR.FILTER');
        }

          return products.filter(product => product.typeTermalCentre?.id === typeTermalCentreId);
    }

    async findAllProductsByTermalTechnique(termalTechniqueId: number) {
        const products = await this.productRepository.find({
            where: { termalTechniques: { id: termalTechniqueId } },
            relations: ['termalTechniques', 'images'],
        });
    
        if (!products.length) {
            throw new BadRequestException('FILTERS.ERROR.FILTER');
        }
    
        return products.filter(product =>
            product.termalTechniques.some(technique => technique.id === termalTechniqueId),
        );
    }

    async findAllProductsByTypeWater(typeWaterId: number) {
        const products = await this.productRepository.find({
            where: { typeWaters: { id: typeWaterId } },
            relations: ['typeWaters', 'images'],
        });

        if (!products.length) {
            throw new BadRequestException('FILTERS.ERROR.FILTER');
        }

        return products.filter(product =>
            product.typeWaters.some(typeWater => typeWater.id === typeWaterId),
        );
    }

    async findAllProductsByTreatment(treatmentId: number) {
        const products = await this.productRepository.find({
            where: { treatments: { id: treatmentId } },
            relations: ['treatments', 'images'],
        });

        if (!products.length) {
            throw new BadRequestException('FILTERS.ERROR.FILTER');
        }

        return products.filter(product =>
            product.treatments.some(treatment => treatment.id === treatmentId),
        );
    }

    async findAllProductsByService(serviceId: number) {
        const products = await this.productRepository.find({
            where: { services: { id: serviceId } },
            relations: ['services', 'images'],
        });

        if (!products.length) {
            throw new BadRequestException('FILTERS.ERROR.FILTER');
        }

        return products.filter(product =>
            product.services.some(service => service.id === serviceId),
        );
    }

    async findAllProductsByAccesibility(accesibilityId: number) {
        const products = await this.productRepository.find({
            where: { accesibility: { id: accesibilityId } },
            relations: ['accesibility', 'images'],
        });

        if (!products.length) {
            throw new BadRequestException('FILTERS.ERROR.FILTER');
        }

        return products.filter(product =>
            product.accesibility.some(acc => acc.id === accesibilityId),
        );
    }

    async findAllProductsByComplementaryTechnique(complementaryTechniqueId: number) {
        const products = await this.productRepository.find({
            where: { complementaryTechniques: { id: complementaryTechniqueId } },
            relations: ['complementaryTechniques', 'images'],
        });

        if (!products.length) {
            throw new BadRequestException('FILTERS.ERROR.FILTER');
        }

        return products.filter(product =>
            product.complementaryTechniques.some(complementaryTechnique => complementaryTechnique.id === complementaryTechniqueId),
        );
    }
      
}

