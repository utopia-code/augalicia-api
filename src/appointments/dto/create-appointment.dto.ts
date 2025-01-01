import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateAppointmentDto {
    @IsDateString()
    date: string;

    @IsString()
    @IsNotEmpty()
    hour: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(1)
    max_capacity: number;

    @IsNumber()
    booked_count: number;

    @IsBoolean()
    is_booked: boolean;

    @IsNumber()
    productId: number;

    @IsString()
    @IsOptional()
    userEmail: string;
}