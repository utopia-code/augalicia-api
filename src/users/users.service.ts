import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UsersRepository
    ) {}
    
    async create(createUserDto: CreateUserDto) {
        return this.usersRepository.create(createUserDto);
    }

    findOne(id: number) {
        return this.usersRepository.findOne(id);
    }

    findOneByEmail(email: string) {
        return this.usersRepository.findOneByEmail(email);
    }

    find(email: string) {
        return this.usersRepository.find(email);
    }

    async update(id: number, attrs: Partial<User>) {
        return this.usersRepository.update(id, attrs);
    }

    async updatePassword(
        id: number, 
        currentPassword: string, 
        newPassword: string
    ) {
        return this.usersRepository.updatePassword(id, currentPassword, newPassword);
    }

    async deleteProfil(id: number) {
        return this.usersRepository.deleteProfil(id);
    }
}