import { IUsers } from "../../modules/users/users.interface";

export interface IAuthToken {
  session: IPayloadToken["session"];
  sub: IUsers["idUser"];
  iat: number;
  exp: number;
}

export interface IUseAuthToken {
  decodedToken: IPayloadToken;
  isExpired: boolean;
}

export interface IPayloadToken {
  sub: IUsers["idUser"];
  session: IUsers;
}
