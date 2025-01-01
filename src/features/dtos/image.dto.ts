import { IsNumber, IsString } from "class-validator";

export class ImageDto {
    @IsString()
    name: string;

    @IsString()
    url: string;

    @IsNumber()
    productId: number;
}