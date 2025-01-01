import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { BookingDto } from 'src/bookings/dto/booking.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
  })
  @Auth(Role.ADMIN)
  createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.appointmentsService.createAppointment(createAppointmentDto, user);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
  })
  @Auth(Role.ADMIN) 
  getAppointmentById(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.appointmentsService.getAppointmentById(parseInt(id), user);
  }

  @Get()
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
  })
  @Auth(Role.ADMIN)
  getAllAppointments(@ActiveUser() user: ActiveUserInterface) {
    return this.appointmentsService.getAllAppointments(user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
  })
  @Auth(Role.ADMIN)
  updateAppointment(
    @Param('id') id: string, 
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.appointmentsService.updateAppointment(parseInt(id), updateAppointmentDto, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
  })
  @Auth(Role.ADMIN)
  removeAppointment(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.appointmentsService.removeAppointment(parseInt(id), user);
  }

  @Post(':id/booking')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
  })
  @Auth(Role.USER)
  bookAppointment(
    @Param('id') id: string,
    @Body() bookingDto: BookingDto,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.appointmentsService.bookAppointment(parseInt(id), bookingDto, user);
  }

  @Delete(':id/cancel')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
  })
  @Auth(Role.USER)
  cancelBooking(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.appointmentsService.cancelBooking(parseInt(id), user);
  }

  @Get(':id/product')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized Bearer Auth'
  })
  @Auth(Role.USER)
  getAllAppointmentsByProduct(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return this.appointmentsService.getAllAppointmentsByProduct(parseInt(id), user)
  }

}