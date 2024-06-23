import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/entities/users.entity";

export class LoginUserDTO{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;   
}

export class LoginUserResponse{
    id: number;
    email: string;
    password: string;
    name: string;
    token: string;
}