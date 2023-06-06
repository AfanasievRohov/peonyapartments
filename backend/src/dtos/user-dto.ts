import { IUser } from '../types/user.type';

export default class UserDto {
  public _id: string;

  public email: string;

  public name: string;

  public phoneNumber: string;

  public isActivated: boolean;

  constructor(userModel: IUser) {
    this._id = userModel._id
    this.email = userModel.email;
    this.name = userModel.name;
    this.phoneNumber = userModel.phoneNumber;
    this.isActivated = userModel.isActivated;
  }
}