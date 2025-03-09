import { IBase } from "../../common/interfaces/base.interface";

export interface IUsers extends IBase {
  password: string;
  idUser: number;
  email: string;
  name: string;
}
