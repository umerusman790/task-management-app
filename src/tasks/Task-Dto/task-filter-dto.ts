import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../taskstatus-enum";

export class filterDto{
    @IsString()
    @IsOptional()
    search: string;
    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;
    
}