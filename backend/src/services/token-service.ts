import jwt, { JwtPayload } from 'jsonwebtoken';
import Token from '../models/token-model';
import UserDto from '../dtos/user-dto';


class TokenService {
  generateTokens(payload: UserDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token: string) {
    try {
      const userData: JwtPayload = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as JwtPayload;
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData: JwtPayload = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as JwtPayload;
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      const token = await tokenData.save();
      return token;
    }

    const token = await Token.create({ user: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  };
}

const tokenService = new TokenService();
export default tokenService;
