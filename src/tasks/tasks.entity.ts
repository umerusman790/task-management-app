import { Exclude } from "class-transformer";
import { User } from "src/auth/users.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./taskstatus-enum";

@Entity()
export class TaskEntity{

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title:string;

    @Column()
    description:string;
    
    @Column()
    status:TaskStatus

    @Exclude({toPlainOnly: true})
    @ManyToOne(()=>User, (user)=>user.tasks, {eager:false})
    user:User;
}