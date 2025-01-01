import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookingDto } from "src/bookings/dto/booking.dto";
import { Booking } from "src/bookings/entities/booking.entity";
import { Role } from "src/common/enums/role.enum";
import { ActiveUserInterface } from "src/common/interfaces/active-user.interface";
import { Product } from "src/products/product.entity";
import { Repository } from "typeorm";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { Appointment } from "./entities/appointment.entity";

@Injectable()
export class AppointmentRepository {
    constructor (
        @InjectRepository(Appointment)
        private appointmentRepository: Repository<Appointment>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>
    ) {}

    private validateOwnership(appointment: Appointment, user: ActiveUserInterface) {
        if (user.role !== Role.ADMIN && appointment.userEmail !== user.email) {
            throw new UnauthorizedException();
        }
    }

    private async checkIfExists(repo: Repository<any>, date: string, hour: string) {
        const existingItem = await repo.findOne({ where: { date, hour } });
        if (existingItem) {
            throw new BadRequestException(`An appointment with this ${date} and ${hour} already exists`);
        }
    }

    private async validateEntity(repo: Repository<any>, value: number, property: string) {
        const entity = await repo.findOneBy({ id: value });
        if (!entity) {
            throw new BadRequestException(`${property} not found`);
        }
        return entity;
    }

    async createAppointment(
        createAppointmentDto: CreateAppointmentDto,
        user: ActiveUserInterface
    ) {
        await this.checkIfExists(this.appointmentRepository, createAppointmentDto.date, createAppointmentDto.hour);

        const product = await this.productRepository.findOne({ where: { id: createAppointmentDto.productId } });
        if (!product) {
            throw new BadRequestException('Product not found');
        }

        const appointment = this.appointmentRepository.create({
            ...createAppointmentDto,
            product: { id: createAppointmentDto.productId },
            userEmail: user.email
        });
        
        await this.appointmentRepository.save(appointment);

        return await this.appointmentRepository.findOne({
            where: { id: appointment.id },
            relations: ['product']
        })
    }

    async updateAppointment(
        id: number, 
        updateAppointmentDto: UpdateAppointmentDto,
        user: ActiveUserInterface
    ) {
        const appointment = await this.appointmentRepository.findOne({ 
            where: { id },
            relations: ['product']
         });

        if(!appointment) {
            throw new BadRequestException('Appointment not found');
        }

        const product = updateAppointmentDto.productId
            ? await this.validateEntity(this.productRepository, updateAppointmentDto.productId, 'Product')
            : appointment.product

        Object.assign(appointment, {
            ...updateAppointmentDto,
            product,
            userEmail: user.email
        });

        return await this.appointmentRepository.save(appointment);
    }

    getAllAppointments() {
        return this.appointmentRepository.find();
    }

    async findOneAppointmentByUser(id: number, user: ActiveUserInterface) {
        const appointment = await this.appointmentRepository.findOneBy({ id });
        if (!appointment) {
            throw new BadRequestException(`${appointment} not found`);
        }

        this.validateOwnership(appointment, user);

        return appointment;
    }

    async removeAppointment(id: number, user: ActiveUserInterface) {
        const appointment = await this.findOneAppointmentByUser(id, user);
        return this.appointmentRepository.remove(appointment);
    }

    async getAllAppointmentsByUser(user: ActiveUserInterface) {
        return await this.appointmentRepository.find({
            where: { userEmail: user.email }
        });
    }

    async getAllAppointmentsByProduct(id: number, user: ActiveUserInterface) {
        if (user.role !== Role.USER) {
            throw new UnauthorizedException();
        }

        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new BadRequestException('Product not found');
        }

        return this.appointmentRepository.find({
            where: {
                productId: product.id
            }
        });
    }

    async bookAppointment(appointmentId: number, booking: BookingDto, user: ActiveUserInterface) {
        const appointment = await this.appointmentRepository.findOne({
            where: { id: appointmentId },
            relations: ['bookings']
        });

        if (!appointment) {
            throw new BadRequestException('Appointment not found');
        }

        if (appointment.is_booked) {
            throw new BadRequestException('This appointment is already fully booked');
        }

        if (booking.people <= 0) {
            throw new BadRequestException('The number of people must be greater than 0');
        }

        if ((appointment.booked_count + booking.people) > appointment.max_capacity) {
            throw new BadRequestException('The number of people exceeds the appointment capacity');
        }

        const existingBooking = await this.bookingRepository.findOne({
            where: { appointmentId, userEmail: user.email }
        });
    
        if (existingBooking) {
            throw new BadRequestException('You have already booked this appointment');
        }

        const newBooking = this.bookingRepository.create({
            people: booking.people,
            appointmentId: booking.appointmentId,
            userEmail: user.email
        })

        await this.bookingRepository.save(newBooking);

        appointment.booked_count = appointment.booked_count + booking.people;

        if (appointment.booked_count >= appointment.max_capacity) {
            appointment.is_booked = true;
        }

        await this.appointmentRepository.update(
            appointment.id, 
            { 
                booked_count: appointment.booked_count, 
                is_booked: appointment.is_booked 
            }
        );

    }

    async cancelBooking(id: number, user: ActiveUserInterface) {

        
        const booking = await this.bookingRepository.findOne({
            where: { id, userEmail: user.email }
        });

        console.log('Booking ID', booking)
        if(!booking) {
            throw new BadRequestException('Booking not found');
        }

        const appointment = await this.appointmentRepository.findOne({
            where: { id: booking.appointmentId }
        })

        if (!appointment) {
            throw new BadRequestException('Appointment not found');
        }

        
        console.log('Booking removed:', booking);

        appointment.booked_count -= booking.people;

        appointment.booked_count < 0 ? 0 : appointment.booked_count

        console.log('appointent booked_count', appointment.booked_count)

        if (appointment.booked_count < appointment.max_capacity) {
            appointment.is_booked = false;
        }

        await this.appointmentRepository.save(appointment);

        await this.bookingRepository.remove(booking);
    }
}