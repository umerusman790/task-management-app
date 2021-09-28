import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UseGuards, Req, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './Task-Dto/create-task-dto';
import {filterDto} from './Task-Dto/task-filter-dto';
import {UpdateTaskDto} from './Task-Dto/update-task-dto';
import { TaskEntity } from './tasks.entity';
import {AuthGuard} from '@nestjs/passport';




@Controller('api/tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService){}

    @Post()
    createTask(@Body() body:TaskDto, @Req() req:any):Promise<TaskEntity>{
        return this.taskService.creatTask(body.title, body.description, req.user);
    }

    @Get()
    getAllTasks(@Query() queryObj:filterDto, @Request() req:any):Promise<TaskEntity[]>{
       
        return this.taskService.getAllTasks(queryObj, req);
        
    }


    @Get('/:id')
    getTaskById(@Param('id') id:string, @Request() req:any) {
        return this.taskService.getTaskById(id, req.user);
    }



    @Patch('/:id')
    updateTaskById(@Param('id') id:string, @Body() body:UpdateTaskDto, @Request() req:any):Promise<TaskEntity>{
        
        return this.taskService.updateTask(id, body, req.user);
    }


    
    @Delete('/:id')
    deleteTask(@Param('id') id:string, @Request() req:any):Promise<TaskEntity>{
         return this.taskService.deleteTask(id, req.user);
    }

    


}
