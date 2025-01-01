import { IsNumber, IsOptional, IsString } from "class-validator";

export class BookingDto {
    @IsNumber()
    people: number;

    @IsNumber()
    appointmentId: number;

    @IsString()
    @IsOptional()
    userEmail: string;
}