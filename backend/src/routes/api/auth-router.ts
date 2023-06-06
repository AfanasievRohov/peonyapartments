import { Router } from 'express';
import authController from '../../controllers/auth-controller';
import { authorize } from '../../middleware/auth-middleware';
import { validate } from '../../middleware/validation/validate-middleware';
import { authRules } from '../../middleware/validation/rules/auth-rules';
import { isExist } from '../../middleware/isExist-middleware';
import User from '../../models/user-model';
import { IUser } from '../../types/user.type';
import { AuthenticatedRequest } from '../../types/auth.type';


const router: Router = Router();

router.post('/registration', validate(authRules.registrationRules), authController.registration);
router.post(
  '/login',
  isExist<IUser>(User, 'email'),
  validate(authRules.loginRules),
  authController.login
);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.get('/protected', authorize, (req: AuthenticatedRequest, res, next) => { // testing route
  res.send('you have reached protected route');
})

export default router;
