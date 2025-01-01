import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class NotificationResDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  type: string;

  @Expose()
  @IsString()
  position: string;

  @Expose()
  @IsString()
  desc: string;

  @Expose()
  @IsNumber()
  productId: number;
}