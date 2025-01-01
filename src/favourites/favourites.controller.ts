import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { FavouriteDto } from './dto/favourite.dto';
import { FavouritesService } from './favourites.service';

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth'
})
@Auth(Role.USER)
@Controller('favourites')
export class FavouritesController {
  constructor(private favouritesService: FavouritesService) {}

  @Post()
  create(
    @Body() favouriteDto: FavouriteDto,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.favouritesService.addToFavourites(favouriteDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: ActiveUserInterface) {
    return this.favouritesService.getAllFavouritesByUser(user);
  }

  @Delete('/:id')
  remove(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.favouritesService.deleteFromFavourites(parseInt(id), user);
  }
}
