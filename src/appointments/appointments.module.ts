import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../auth/auth.module';
import { BookingsModule } from './../bookings/bookings.module';
import { ProductsModule } from './../products/products.module';
import { AppointmentsController } from './appointments.controller';
import { AppointmentRepository } from './appointments.repository';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment
    ]),
    ProductsModule,
    AuthModule,
    forwardRef(() => BookingsModule)
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentRepository],
  exports: [TypeOrmModule]
})
export class AppointmentsModule {}
