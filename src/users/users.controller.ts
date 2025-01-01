import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Put,
    Query
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));

        if (!user) {
            throw new NotFoundException('user not found');
        }

        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Patch('/:id') 
    updateUser(
        @Param('id') id: string, 
        @Body() body: UpdateUserDto
    ) {
        return this.usersService.update(parseInt(id), body);
    }

    @Put('/:id/password')
    updatePassword(
        @Param('id') id: string,
        @Body() updatePasswordDto: UpdatePasswordDto
    ) {  
        const { currentPassword, newPassword } = updatePasswordDto;
        return this.usersService.updatePassword(parseInt(id), currentPassword, newPassword);
    }

    @Delete('/:id')
    deleteProfil(@Param('id') id: string) {
        return this.usersService.deleteProfil(parseInt(id))
    }
}
