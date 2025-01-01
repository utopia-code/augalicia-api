import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActiveUserInterface } from "./../common/interfaces/active-user.interface";
import { Booking } from "./entities/booking.entity";

@Injectable()
export class BookingRepository {
    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
    ) {}

    async getAllBookingsByUser(user: ActiveUserInterface) {
        return await this.bookingRepository.find({
            where: { userEmail: user.email },
            relations: ['appointment', 'appointment.product']
        });
    }
}