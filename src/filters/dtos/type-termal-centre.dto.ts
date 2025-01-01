import { IsString } from "class-validator";

export class TypeTermalCentreDto {
    @IsString()
    name: string;
}