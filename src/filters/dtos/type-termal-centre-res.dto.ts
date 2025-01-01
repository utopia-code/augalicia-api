import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class TypeTermalCentreeResDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;
}