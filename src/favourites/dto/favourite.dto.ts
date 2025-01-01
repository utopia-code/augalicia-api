import { IsNumber, IsOptional, IsString } from "class-validator";

export class FavouriteDto {
    @IsNumber()
    productId: number;

    @IsString()
    @IsOptional()
    userEmail: string;
}