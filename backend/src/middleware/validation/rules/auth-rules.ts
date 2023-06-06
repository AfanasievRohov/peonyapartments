import { body } from 'express-validator';

export const registrationRules = [
  body('name').isString().withMessage('Name must be a string'),
  body('email').isEmail().withMessage('Not correct email format'),
  body('phoneNumber').isMobilePhone('uk-UA').withMessage('Wrong phone number format'),
  body('password').isLength({ min: 5, max: 32 }).withMessage('Password length must be from 5 to 32 characters')
];

export const loginRules = [
  body('email').isEmail().withMessage('Not correct email format'),
  body('password').isLength({ min: 5, max: 32 }).withMessage('Password length must be from 5 to 32 characters')
];

export const authRules = {
  registrationRules,
  loginRules
};
