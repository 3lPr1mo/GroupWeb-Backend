import { IsEmail, IsNotEmpty } from "class-validator";

export class ChangeUserRequest {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}