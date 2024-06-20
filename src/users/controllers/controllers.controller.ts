import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { User } from '../entities/users.entity';
import { LoginUser } from '../dto/loginUser';
import { Response } from 'express';

@Controller('user')
export class ControllersController {
    constructor( private readonly userService: ServicesService ){}

    @Get()
    async getAllUsers(): Promise<User[]>{
        return await this.userService.getAllUsers();
    }

    @Get(':email')
    async getUserByEmail(@Param('email') email: string): Promise<User>{
        return await this.userService.getUserByEmail(email)
    }

    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<User>{
        return await this.userService.getUserById(id);
    }

    @Post()
    async createUser(@Body() userData: Partial<User>): Promise<User> {
        return await this.userService.createUser(userData);
    }

    @Post('login')
    async loginUser(@Body() userData: LoginUser, @Res() res: Response) {
        try{
            const a = await this.userService.loginUser(userData)
            return res.status(HttpStatus.OK).json({ message: 'Login successful', user: a });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({message: 'Invalid Credentials'});
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() userData: Partial<User>): Promise<User> {
        return await this.userService.updateUser(id, userData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void>{
        await this.userService.deleteUser(id)
    }
}
