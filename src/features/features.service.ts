import { Injectable } from '@nestjs/common';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { ImageDto } from './dtos/image.dto';
import { NotificationDto } from './dtos/notification.dto';
import { OpeningSeasonDto } from './dtos/opening-season.dto';
import { FeaturesRepository } from './features.repository';

@Injectable()
export class FeaturesService {
    constructor(
        private featuresRepository: FeaturesRepository
    ) {}

    async createOpeningSeason(
        openingSeasonDto: OpeningSeasonDto,
        user: ActiveUserInterface
    ) {
        return await this.featuresRepository.createOpeningSeason(openingSeasonDto, user);
    }

    async getAllOpeningSeasons(user: ActiveUserInterface) {
        return await this.featuresRepository.getAllOpeningSeasons(user);
    }

    async getImageByName(
        filename: string, 
        productId: number,
        user: ActiveUserInterface
    ) {
        return await this.featuresRepository.getImageByName(filename, productId, user);
    }

    async deleteImageByName(
        filename: string, 
        productId: number,
        user: ActiveUserInterface
    ) {
        return await this.featuresRepository.deleteImageByName(filename, productId, user);
    }

    async createImage(
        imageDto: ImageDto,
        user: ActiveUserInterface
    ) {
        return await this.featuresRepository.createImage(imageDto, user);
    }

    async getAllImagesByProduct(
        id: number,
        user: ActiveUserInterface
    ) {
        return await this.featuresRepository.getAllImagesByProduct(id, user);
    }

    async createNotification(
        notificationDto: NotificationDto,
        user: ActiveUserInterface
    ) {
        return await this.featuresRepository.createNotification(notificationDto, user);
    }

    async deleteNotification(
        id: number, 
        productId: number,
        user: ActiveUserInterface
    ) {
        return await this.featuresRepository.deleteNotification(id, productId, user);
    }

    async getAllNotificationsByProduct(
        id: number,
        user: ActiveUserInterface
    ) {
        return await this.featuresRepository.getAllNotificationsByProduct(id, user);
    }
}
