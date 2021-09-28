import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import {User} from './users.entity';
import * as bcrypt from 'bcrypt';


@EntityRepository(User)

export class UserRepository extends Repository<User> {


    /////////  create User Method //////////////////////

    async createUser(body:Partial<User>){

        const {username, password} =body;

        // generating Salt
        const salt = await bcrypt.genSalt();
        // generating hashed Password
        const hashedPassword = await bcrypt.hash(password, salt);
        // storing hashed Password
        const user = await this.create({username, password: hashedPassword});
  
        // checking if user exists if not then signup user
        try{
         await this.save(user);
        }catch(err){
            
            if(err.code ==='23505'){
                throw new ConflictException('User Already Exists')
            }
            
        }

    }


    /////////// Authenticate User ///   sign In Method//////////////


    async authUser(body: Partial<User>){

        const {username, password} = body;

        const user = await this.findOne({username});
        
        if(!user){
            throw new NotFoundException(`User with UserName: ${username} does not exists`); 
        }

        const match = await bcrypt.compare(password, user.password);
        
        if(!match){
            throw new UnauthorizedException(`Incorrect Password for username: ${username}`)
        }
        
        return user;




    }
}