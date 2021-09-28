import { distinctUntilChanged } from "rxjs";

// export interface Task{
//     id:string;
//     title:string;
//     description:string;
//     status:TaskStatus
// }

export enum TaskStatus{
    Open ='OPEN',
    Progress ='PROGRESS',
    Done ='DONE'

}