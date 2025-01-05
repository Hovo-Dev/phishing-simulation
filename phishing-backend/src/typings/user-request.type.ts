import { Request } from 'express';
import { User } from '../modules/database/entities/user.entity';

export type UserRequest = Request & {
  user: User;
};
