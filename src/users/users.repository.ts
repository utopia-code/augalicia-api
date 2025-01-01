import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcryptjs from 'bcryptjs';
import { Product } from "src/products/product.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    create(createUserDto: CreateUserDto) {
        return this.usersRepository.save(createUserDto);
    }

    findOne(id: number) {
        return this.usersRepository.findOneBy({ id });
    }

    findOneByEmail(email: string) {
        return this.usersRepository.findOneBy({ email })
    }

    find(email: string) {
        return this.usersRepository.find({ where: { email }})
    }

    async update(
        id: number, 
        attrs: Partial<User>
    ) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('FORM.ERROR.USER_NOT_FOUND');
        }

        if (attrs.password) {
            const salt = await bcryptjs.genSalt();
            attrs.password = await bcryptjs.hash(attrs.password, salt);
        }

        Object.assign(user, attrs);

        return this.usersRepository.save(user);
    }

    async updatePassword(
        id: number, 
        currentPassword: string, 
        newPassword: string
    ) {
        const user = await this.usersRepository.findOneBy({id});
        if (!user) {
          throw new NotFoundException('FORM.ERROR.USER_NOT_FOUND');
        }
      
        const isPasswordValid = await bcryptjs.compare(currentPassword, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('FORM.ERROR.PASSWORD');
        }
      
        const salt = await bcryptjs.genSalt();
        user.password = await bcryptjs.hash(newPassword, salt);
        await this.usersRepository.update(id, user);
    }

    async deleteProfil(id: number) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException('FORM.ERROR.USER_NOT_FOUND');
        }

        const product = await this.productRepository.find({
            where: { userEmail: user.email}
        })

        const hasActiveProducts = product.length > 0;

        if (hasActiveProducts) {
            throw new BadRequestException('FORM.ERROR.DELETE_PROFIL');
        }

        return this.usersRepository.remove(user);
    }

}