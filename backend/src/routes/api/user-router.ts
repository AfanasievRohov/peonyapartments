import { Router } from 'express';
import { authorize } from '../../middleware/auth-middleware';
import userController from '../../controllers/user-controller';
import { validate } from '../../middleware/validation/validate-middleware';
import { userRules } from '../../middleware/validation/rules/user-rules';
import { isExist } from '../../middleware/isExist-middleware';
import { IUser } from '../../types/user.type';
import User from '../../models/user-model';

const router: Router = Router();

router.get('/profile', authorize, userController.getProfile); // get user profile | return user from request object
router.get('/', userController.getAllUsers) // get all users | for testing purposes
router.post(
  '/:id',
  authorize,
  isExist<IUser>(User, '_id'),
  validate(userRules.registrationRules),
  userController.updateUser
); // update user by id
router.delete(
  '/:id',
  authorize,
  isExist<IUser>(User, '_id'),
  userController.deleteUser
); // delete user by id

export default router;
