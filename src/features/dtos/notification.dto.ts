import { IsIn, IsNumber, IsString } from "class-validator";
import { Position, Type } from "../../common/enums/notification.enum";

export class NotificationDto {
    @IsIn([Type.ALERT, Type.INFO, Type.ADVICE])
    type: Type;

    @IsIn([Position.BOTTOM, Position.MIDDLE, Position.TOP])
    position: Position;

    @IsString()
    desc: string;

    @IsNumber()
    productId: number;
}