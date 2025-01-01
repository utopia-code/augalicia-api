import { Expose } from "class-transformer";
import { Role } from "src/common/enums/role.enum";

export class UserDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    surname: string;

    @Expose()
    email: string;

    @Expose()
    role: Role
}