import { IsNotEmpty, IsString } from "class-validator";



export class UserSigninDto{

    @IsString()
    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}