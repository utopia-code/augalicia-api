import { IsString } from "class-validator";

export class TypeWaterDto {
    @IsString()
    name: string;
}