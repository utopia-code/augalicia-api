import { Injectable } from '@nestjs/common';
import { BookingDto } from 'src/bookings/dto/booking.dto';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { AppointmentRepository } from './appointments.repository';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    private appointmentRepository: AppointmentRepository
  ) {}

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
    user: ActiveUserInterface
  ) {
    return await this.appointmentRepository.createAppointment(createAppointmentDto, user);
  }

  async getAppointmentById(
    id: number,
    user: ActiveUserInterface
  ) {
    return await this.appointmentRepository.findOneAppointmentByUser(id, user);
  }

  async getAllAppointments(user: ActiveUserInterface) {
    return await this.appointmentRepository.getAllAppointmentsByUser(user);
  }

  async updateAppointment(
    id: number, 
    updateAppointmentDto: UpdateAppointmentDto,
    user: ActiveUserInterface
  ) {
    return await this.appointmentRepository.updateAppointment(id, updateAppointmentDto, user);
  }

  async removeAppointment(
    id: number,
    user: ActiveUserInterface
  ) {
    return await this.appointmentRepository.removeAppointment(id, user);
  }

  async getAllAppointmentsByProduct(
    id: number,
    user: ActiveUserInterface
  ) {
    return await this.appointmentRepository.getAllAppointmentsByProduct(id, user);
  }

  async bookAppointment(
    id: number,
    booking: BookingDto,
    user: ActiveUserInterface
  ) {
    return await this.appointmentRepository.bookAppointment(id, booking, user);
  }

  async cancelBooking(
    id: number,
    user: ActiveUserInterface
  ) {
    return await this.appointmentRepository.cancelBooking(id, user)
  }
}