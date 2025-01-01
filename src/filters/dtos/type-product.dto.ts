import { IsString } from "class-validator";

export class TypeProductDto {
    @IsString()
    name: string;
}