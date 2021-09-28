import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/tasks/tasks.entity';
import { User } from './users.entity';
import {UserRepository} from './users.repository';


@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository) private UserRepository:UserRepository,
    private jwtService:JwtService){ }


    ////// signup /////////////////////

     signup(body:Partial<User>){
         return this.UserRepository.createUser(body)
    }

    ////// sign in methods  ///////////////

    async signin(body:Partial<User>){
       const user =  await this.UserRepository.authUser(body);
       const payload = {
           username: user.username,
       }

       return {
        accessToken : this.jwtService.sign(payload)
       } 
    }
}
