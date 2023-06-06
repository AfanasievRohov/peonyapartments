import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth.type';
import userService from '../services/user-service';
import { IUser } from '../types/user.type';

class UserController {
  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { user } = req;

      return res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();

      return res.json({ users });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user as IUser;

      const updatedUser = await userService.update(_id, req.body);

      return res.json({ updatedUser });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { _id } = req.user as IUser;
      await userService.delete(_id);

      return res.json({
        message: `User with has been successfully deleted`
      })
    } catch (error) {
      next(error);
    }
  }
}

const userController = new UserController();
export default userController;
