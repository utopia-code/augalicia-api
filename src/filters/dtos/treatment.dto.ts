import { IsString } from "class-validator";

export class TreatmentDto {
    @IsString()
    name: string;
}