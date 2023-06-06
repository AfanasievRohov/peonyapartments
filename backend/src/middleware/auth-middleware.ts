import { Request, Response, NextFunction, RequestHandler } from 'express';
import ApiError from '../exceptions/api-error';
import tokenService from '../services/token-service';
import { IUser } from '../types/user.type';
import { AuthenticatedRequest } from '../types/auth.type';


export function authorize(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw ApiError.Unauthorized();
    }

    const accessToken= authorizationHeader.split(' ')[1];

    if (!accessToken) {
      throw ApiError.Unauthorized();
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      throw ApiError.Unauthorized();
    }

    req.user = userData as IUser;
    return next();
  } catch (error) {
    return next(error);
  }
}
