import { IsString } from "class-validator";

export class OpeningSeasonDto {
    @IsString()
    name: string;
}