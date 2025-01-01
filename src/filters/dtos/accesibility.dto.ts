import { IsString } from "class-validator";

export class AccesibilityDto {
    @IsString()
    name: string;
}