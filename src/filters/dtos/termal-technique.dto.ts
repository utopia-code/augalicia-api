import { IsString } from "class-validator";

export class TermalTechniqueDto {
    @IsString()
    name: string;
}