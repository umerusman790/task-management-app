import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {CreateUserDto} from './dto/create-user-dto';
import {UserSigninDto} from './dto/user-signin-dto';

@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    signup(@Body() body:CreateUserDto){
        return this.authService.signup(body);
    }

    @Post('/signin')
    signin(@Body() body:UserSigninDto){
        return this.authService.signin(body);
    }

    
}
