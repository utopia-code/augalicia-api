import { Injectable } from '@nestjs/common';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { BookingRepository } from './bookings.repository';

@Injectable()
export class BookingsService {
  constructor(
    private bookingRepository: BookingRepository
  ) {}

  async getAllBookingsByUser(user: ActiveUserInterface) {
    return await this.bookingRepository.getAllBookingsByUser(user);
  }
}
