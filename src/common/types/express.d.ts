import { IPayloadToken } from "../../modules/auth/auth.interface";

declare global {
  namespace Express {
    interface Request {
      session: IPayloadToken;
    }
  }
}
