import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from './../appointments/appointments.module';
import { AuthModule } from './../auth/auth.module';
import { ProductsModule } from './../products/products.module';
import { BookingsController } from './bookings.controller';
import { BookingRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    forwardRef(() => AppointmentsModule),
    ProductsModule,
    AuthModule
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingRepository],
  exports: [TypeOrmModule]
})
export class BookingsModule {}
