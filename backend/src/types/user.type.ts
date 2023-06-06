import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password?: string;
  isActivated: boolean;
  activationLink?: string;
}
