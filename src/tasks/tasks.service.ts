import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './taskstatus-enum';
import {v4 as uuid} from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './tasks.entity';
import {TaskRepository} from './tasks.repository';
import {User} from "src/auth/users.entity";
import { isRFC3339 } from 'class-validator';



@Injectable()
export class TasksService {
    
    constructor(@InjectRepository(TaskRepository) private taskRepo:TaskRepository){

    }

    ///////////  Create Task 

    creatTask(title:string, description:string, user:User):Promise<TaskEntity>{
       return  this.taskRepo.creatTask(title, description, user);
        
    }

    // //////////  get all Tasks

    getAllTasks(queryObj, req):Promise<TaskEntity[]>{
        return this.taskRepo.getAllTasks(queryObj, req);
    }
    
    // ////// get task by

    async getTaskById(id:string, user:User){

        const query = this.taskRepo.createQueryBuilder('task');

        query.where({user})

        // const task = await this.taskRepo.findOne(id);
        // if(!task){
        //     throw new NotFoundException('Invalid Task Id', `Task with id:${id} does not exist`); 
        // }
         query.andWhere('task.id = :id',{id:id});

         const task= await query.getOne();
         if (!task) {
             throw new NotFoundException(`Task with id:${id} does not exist`);
         }
         return task;
    }



    // ////    filtered Tasks

    

    // ////////  update task 

    async updateTask(id:string, body:Partial<TaskEntity>, user:User){

        const task = await this.getTaskById(id, user);
       
        Object.assign(task, body)
       
        await this.taskRepo.save(task);
        return task;
        
    }
    
    // ///////  deleteTask    
    async deleteTask(id:string, user:User):Promise<TaskEntity>{
        const taskfounds = await this.getTaskById(id, user);
        await this.taskRepo.remove(taskfounds);
        return taskfounds;
        
    }
}
