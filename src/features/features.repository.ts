import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./../common/enums/role.enum";
import { ActiveUserInterface } from "./../common/interfaces/active-user.interface";
import { Product } from "./../products/product.entity";
import { ImageDto } from "./dtos/image.dto";
import { NotificationDto } from "./dtos/notification.dto";
import { OpeningSeasonDto } from "./dtos/opening-season.dto";
import { Image } from "./entities/image.entity";
import { Notification } from "./entities/notification.entity";
import { OpeningSeason } from "./entities/opening-season.entity";

@Injectable()
export class FeaturesRepository {
    constructor(
        @InjectRepository(OpeningSeason)
        private openingSeasonRepository: Repository<OpeningSeason>,

        @InjectRepository(Image)
        private imageRepository: Repository<Image>,

        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    private validateOwnership(user: ActiveUserInterface) {
        if (user.role !== Role.ADMIN) {
            throw new UnauthorizedException();
        }
    }

    async createOpeningSeason(
        openingSeasonDto: OpeningSeasonDto,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);
        await this.checkIfExists(this.openingSeasonRepository, 'name', openingSeasonDto.name);
        const openingSeason = this.openingSeasonRepository.create(openingSeasonDto);
        return this.openingSeasonRepository.save(openingSeason);
    }

    getAllOpeningSeasons(user: ActiveUserInterface) {
        this.validateOwnership(user);
        return this.openingSeasonRepository.find();
    }

    async createImage(
        imageDto: ImageDto,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);
        await this.checkIfExists(this.imageRepository, 'url', imageDto.url);
        const image = this.imageRepository.create(imageDto);
        return this.imageRepository.save(image);
    }

    async getAllImagesByProduct(
        id: number,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);

        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new BadRequestException('Product not found');
        }

        return this.imageRepository.find({
            where: {
                productId: product.id
            }
        });
    }

    async getImageByName(
        filename: string, 
        productId: number,
        user: ActiveUserInterface
    ) {
        const image = await this.imageRepository.findOne({ where: { name: filename, productId } });

        if (!image) {
            throw new Error(`Image with name ${filename} not found for the product`);
        }

        this.validateOwnership(user);

        return image
    }

    async deleteImageByName(
        filename: string, 
        productId: number,
        user: ActiveUserInterface
    ) {
        const image = await this.getImageByName(filename, productId, user);
        return this.imageRepository.remove(image)
    }

    async createNotification(
        notificationDto: NotificationDto,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);
        const notification = this.notificationRepository.create(notificationDto);
        return this.notificationRepository.save(notification);
    }

    async deleteNotification (
        id: number,
        productId: number,
        user: ActiveUserInterface
    ) {
        const notification = await this.notificationRepository.findOne({
            where: { id, productId }
        })

        if (!notification) {
            throw new Error(`Notification with id ${id} not found for the product`)
        }

        this.validateOwnership(user);

        return this.notificationRepository.remove(notification)
    }

    async getAllNotificationsByProduct(
        id: number,
        user: ActiveUserInterface
    ) {
        this.validateOwnership(user);

        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new BadRequestException('Product not found');
        }

        return this.notificationRepository.find({
            where: {
                productId: product.id
            }
        });
    }

    private async checkIfExists(repository: Repository<any>, key: string, value: string | number) {
        const existingItem = await repository.findOne({ where: { [key]: value } });
        if (existingItem) {
            throw new BadRequestException(`${value} already exists`);
        }
    }
}