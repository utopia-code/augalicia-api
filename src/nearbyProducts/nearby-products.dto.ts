import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class NearbyProductsDto {
    @IsNumber()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    lat: number;

    @IsNumber()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    lng: number;

    @IsNumber()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    distanceKm: number;
}

