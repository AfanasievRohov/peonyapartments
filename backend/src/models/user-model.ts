import { model, Schema } from 'mongoose';
import { IUser } from '../types/user.type';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, require: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String }
});

const User = model<IUser>('User', userSchema);
export default User;
