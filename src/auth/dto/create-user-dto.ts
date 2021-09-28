import { IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto{

    @IsString()
    @MaxLength(15)
    @MinLength(5)

    username:string;

    @IsString()
    @MaxLength(15)
    @MinLength(5)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message:'Passwords must contain at least 1 upper case letter, 1 lower case letter, 1 number or special character'
    })
    password:string;
}