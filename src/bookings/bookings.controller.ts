import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Auth } from './../auth/decorators/auth.decorator';
import { ActiveUser } from './../common/decorators/active-user.decorator';
import { Role } from './../common/enums/role.enum';
import { ActiveUserInterface } from './../common/interfaces/active-user.interface';
import { BookingsService } from './bookings.service';


@Controller()
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
  })
  @Auth(Role.USER)
  @Get('bookings')
  getAllBookingsByUser(@ActiveUser() user: ActiveUserInterface) {
    return this.bookingsService.getAllBookingsByUser(user);
  }
}
