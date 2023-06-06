import { body } from 'express-validator';

export const registrationRules = [
  body('name').optional().isString().withMessage('Name must be a string'),
  body('email').isEmail().optional().withMessage('Not correct email format'),
  body('phoneNumber').optional().isMobilePhone('uk-UA').withMessage('Wrong phone number format'),
  body('password').optional().isLength({ min: 5, max: 32 }).withMessage('Password length must be from 5 to 32 characters')
];

export const userRules = {
  registrationRules
};
