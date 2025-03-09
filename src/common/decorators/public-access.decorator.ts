import { PUBLIC_KEY } from "../constants/key-decorators";
import { SetMetadata } from "@nestjs/common";

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);
