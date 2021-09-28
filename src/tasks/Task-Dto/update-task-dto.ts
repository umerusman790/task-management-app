import { IsEnum, IsOptional, IsString } from "class-validator";
import {TaskStatus} from '../taskstatus-enum';

export class UpdateTaskDto{

    @IsString()
    @IsOptional()
    title:string;

    @IsOptional()
    @IsString()
    description:string;

    @IsEnum(TaskStatus)
    status:TaskStatus
}