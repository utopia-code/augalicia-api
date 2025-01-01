import { IsString } from "class-validator";

export class ServiceDto {
    @IsString()
    name: string;
}