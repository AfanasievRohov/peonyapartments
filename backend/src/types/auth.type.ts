import { Request } from 'express';
import { IUser } from './user.type';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}