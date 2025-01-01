import { Injectable } from '@nestjs/common';
import { ActiveUserInterface } from './../common/interfaces/active-user.interface';
import { FavouriteDto } from './dto/favourite.dto';
import { FavouritesRepository } from './favourites.repository';

@Injectable()
export class FavouritesService {
  constructor(
    private favouritesRepository: FavouritesRepository
  ) {}

  async addToFavourites(favouriteDto: FavouriteDto, user: ActiveUserInterface) {
    return await this.favouritesRepository.addToFavourites(favouriteDto, user);
  }

  async deleteFromFavourites(id: number, user: ActiveUserInterface) {
    return await this.favouritesRepository.deleteFromFavourites(id, user);
  }

  async getAllFavouritesByUser(user: ActiveUserInterface) {
    return await this.favouritesRepository.getAllFavouritesByUser(user);
  }
}
