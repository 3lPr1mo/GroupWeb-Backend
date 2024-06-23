import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO, LoginUserResponse } from './dto/loginDTO';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardCustom } from './guards/auth.guard';
import { User } from 'src/users/entities/users.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    loginUser(@Body() userLogin: LoginUserDTO){
        return this.authService.login(userLogin)
    }

    @Get('private')
    @UseGuards( AuthGuard() )
    testingPrivateRoute(){
        return {
            ok: true,
            message: 'Hola mundo private'
        }
    }

    @UseGuards(AuthGuardCustom)
    @Get('check-token')
    checkToken(@Request() req: Request): LoginUserResponse{
        const user = req['user'] as User;
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
            token: this.authService.generateJwtToken({id: user.id, email: user.email, name: user.email})
        }
    }
}
