import { IBase } from "../../common/interfaces/base.interface";
import { TasksEntity } from "../tasks/tasks.entity";

export interface IUsers extends IBase {
  tasks: TasksEntity[];
  password: string;
  idUser: string;
  email: string;
  name: string;
}
