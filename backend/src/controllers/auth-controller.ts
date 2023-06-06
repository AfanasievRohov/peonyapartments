import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth-service';
import { getRefreshCookieExpirationDate } from '../utils/cookie-utils';

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = await authService.registration(req.body);
  
      const expirationDate = getRefreshCookieExpirationDate();
  
      res.cookie(
        process.env.REFRESH_COOKIE_NAME,
        userData.tokens.refreshToken,
        { expires: expirationDate, httpOnly: true }
      );
  
      return res.json({ userData });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = await authService.login(req.body);

      const expirationDate = getRefreshCookieExpirationDate();

      res.cookie(
        process.env.REFRESH_COOKIE_NAME,
        userData.tokens.refreshToken,
        { expires: expirationDate, httpOnly: true }
      );

      return res.json({ userData });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await authService.logout(refreshToken);

      res.clearCookie(process.env.REFRESH_COOKIE_NAME);

      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await authService.activate(activationLink);

      return res.redirect(process.env.ACTIVATE_REDIRECT_LINK);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);

      const expirationDate = getRefreshCookieExpirationDate();

      res.cookie(
        process.env.REFRESH_COOKIE_NAME,
        userData.tokens.refreshToken,
        { expires: expirationDate, httpOnly: true }
      );

      return res.json({ userData });
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController();
export default authController;
