import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class ImageResDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  url: string;

  @Expose()
  @IsNumber()
  productId: number;
}