import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDTO } from './dto/loginDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        private jwtAuthService: JwtService
    ){}

    async login(userLogin: LoginUserDTO) {
        const {email, password} = userLogin
        const findUser = await this.userRepository.findOneBy({email})
        
        if(!findUser) throw new UnauthorizedException('Credentials are not valid');

        const checkPassword = await compare(password, findUser.password)
        if(!checkPassword) throw new UnauthorizedException('Credentials are not valid');

        return {
            ...findUser,
            token: this.generateJwtToken({id: findUser.id, email: findUser.email, name: findUser.name})
        };
    }

    generateJwtToken(payload: JwtPayload){
        const token = this.jwtAuthService.sign(payload)
        return token;
    }
}
