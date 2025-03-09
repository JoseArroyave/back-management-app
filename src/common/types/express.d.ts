import { IPayloadToken } from "../../config/auth/auth.interface";

declare global {
  namespace Express {
    interface Request {
      session: IPayloadToken;
    }
  }
}
