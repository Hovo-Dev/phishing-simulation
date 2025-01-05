import { Request } from 'express';
import {User} from "../modules/database/schemas/user.schema";

export type UserRequest = Request & {
  user: User;
};
