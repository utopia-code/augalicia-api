import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { Role } from "src/common/enums/role.enum";

export class RegisterDto {
    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @IsEnum(Role, { message: "Role must be either admin or user" })
    role: Role
}