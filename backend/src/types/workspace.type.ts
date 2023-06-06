import { Document, Schema, Types } from 'mongoose';
import { IUser } from './user.type';
import { IApartment } from './apartment.type';

export interface IWorkspace extends Document {
  _id: Types.ObjectId;
  name: string;
  owner: Types.ObjectId | IUser;
  users: Array<Types.ObjectId | IUser>;
  administrators: Array<Types.ObjectId | IUser>;
  apartments: Types.ObjectId | IApartment;
}
