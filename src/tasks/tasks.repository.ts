import { TaskEntity } from "./tasks.entity";
import {Repository, EntityRepository} from 'typeorm';
import { TaskStatus } from "./taskstatus-enum";
import { User } from "src/auth/users.entity";

@EntityRepository(TaskEntity)

export class TaskRepository extends Repository<TaskEntity>{

    ////// creating Task
    async creatTask(title:string, description:string, user:User):Promise<TaskEntity[]>{

        const task = await this.create({
            title,
            description,
            status:TaskStatus.Open,
            user,
        });

        await this.save(task);
        return this.find({user});
    }

    ////// filtered task 

    async getAllTasks(queryObj, req):Promise<TaskEntity[]>{
        const {user} = req;
        const {status, search} = queryObj;
        const query  = this.createQueryBuilder('task');
       
        query.where({user});

        if(status){
          query.andWhere(
                '(task.status = :status)',{status:status});
            
        }
        if(search){
            query.andWhere(
                  '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                  {search:`%${search}%`}
              )
          }

        const tasks = await query.getMany()

        return tasks;

    }

    

}