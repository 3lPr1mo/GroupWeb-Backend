import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({id})
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({email})
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const user = new User();
        Object.assign(user, userData);

        //Encriptar
        if (userData.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            user.password = hashedPassword;
        }

        return await this.userRepository.save(user);
    }

    async updateUser(id: number, userData: Partial<User>): Promise<User>{
        const user = await this.userRepository.findOneBy({id});
        if (!user) {
            throw new Error('User not found');
        }

        Object.assign(user, userData);
        return await this.userRepository.save(user)
    }

    async deleteUser(id: number): Promise<void>{
        await this.userRepository.delete(id)
    }
}
