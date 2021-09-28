import { Exclude } from "class-transformer";
import { TaskEntity } from "src/tasks/tasks.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column({unique: true})
  username: string;

  @Exclude({toPlainOnly: true})
  @Column()
  password: string;

  @OneToMany(()=>TaskEntity, (task)=>task.user,{eager:true})
  tasks:TaskEntity[];
}