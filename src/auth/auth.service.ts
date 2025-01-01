import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { RegisterDto } from "src/auth/dto/register.dto";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private readonly jwtService: JwtService
    ) {}

    async register ({ name, surname, email, password, role }: RegisterDto) {
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('FORM.ERROR.MSG_REGISTER');
        }

        const salt = await bcryptjs.genSalt();
        const user = await this.usersService.create({
            name, 
            surname, 
            email, 
            password: await bcryptjs.hash(password, salt),
            role
        });
        
        return user;
    }

    async login ({email, password}: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);
        if(!user) {
            throw new UnauthorizedException('FORM.ERROR.EMAIL');
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('FORM.ERROR.PASSWORD');
        }

        const payload = { email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        
        return {
          token,
          email,
          id: user.id,
          role: user.role
        };
    }

    async profile({ email, role }: { email: string; role: string }) {
        return await this.usersService.findOneByEmail(email);
    }
}