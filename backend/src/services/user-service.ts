import UserDto from '../dtos/user-dto';
import User from '../models/user-model';
import { IUser } from '../types/user.type';

class UserService {
  async getAllUsers() {
    const users = User.find();

    return users;
  }

  async update(userId: string, body: IUser) {
    const updatedUser = await User.findByIdAndUpdate(userId, { ...body }, { new: true });

    if (updatedUser) {
      const userDto = new UserDto(updatedUser);

      return userDto;
    }
  }

  async delete(userId: string) {
    await User.findOneAndDelete({ _id: userId });

    return true;
  }
}

const userService = new UserService();
export default userService;
