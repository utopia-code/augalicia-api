import { IsString } from "class-validator";

export class ComplementaryTechniqueDto {
    @IsString()
    name: string;
}