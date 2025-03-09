import { IBase } from "../../common/interfaces/base.interface";
import { UsersEntity } from "../users/users.entity";

export interface ITasks extends IBase {
  owners: UsersEntity[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  title: string;
  id: string;
}
