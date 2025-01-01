import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActiveUserInterface } from "./../common/interfaces/active-user.interface";
import { FavouriteDto } from "./dto/favourite.dto";
import { Favourite } from "./entities/favourite.entity";

@Injectable()
export class FavouritesRepository {
    constructor(
        @InjectRepository(Favourite)
        private favouriteRepository: Repository<Favourite>
    ) {}

    async addToFavourites(
        favouriteDto: FavouriteDto,
        user: ActiveUserInterface
    ) {
        const favourite = this.favouriteRepository.create({
            productId: favouriteDto.productId,
            userEmail: user.email,
            product: { id: favouriteDto.productId }
        });

        await this.favouriteRepository.save(favourite);

        return await this.favouriteRepository.findOne({
            where: { id: favourite.id },
            relations: ['product']
        })
    
    }

    async deleteFromFavourites(id: number, user: ActiveUserInterface) {
        const favourite = await this.favouriteRepository.findOne({
            where: { productId: id, userEmail: user.email }
        });

        if (!favourite) {
            throw new BadRequestException('Favourite not found');
        }

        return await this.favouriteRepository.remove(favourite);
    }

    async getAllFavouritesByUser(user: ActiveUserInterface) {
        return await this.favouriteRepository.find({
            where: { userEmail: user.email },
            relations: ['product', 'product.images'],
        });
    }
}