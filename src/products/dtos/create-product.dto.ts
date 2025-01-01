import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { ImageDto } from "src/features/dtos/image.dto";
import { NotificationDto } from "src/features/dtos/notification.dto";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    tel: string;

    @IsString()
    email: string;

    @IsString()
    web: string;

    @IsString()
    address: string;

    @IsString()
    cp: string;

    @IsString()
    location: string;

    @IsString()
    desc: string;

    @IsString()
    coordinates: string;

    @IsString()
    @IsOptional()
    typeProduct: string;

    @IsString()
    @IsOptional()
    typeTermalCentre: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    termalTechniques: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    typeWaters: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    treatments: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    services: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    accesibility: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    complementaryTechniques: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    openingSeason: string[];

    @IsNumber()
    @IsOptional()
    ageRequirement: number;

    @IsNumber()
    @IsOptional()
    temperature: number;

    @IsArray()
    @IsOptional()
    @Type(() => ImageDto)
    images: ImageDto[];

    @IsArray()
    @IsOptional()
    @Type(() => NotificationDto)
    notifications: NotificationDto[];

    @IsString()
    @IsOptional()
    userEmail: string;
}
