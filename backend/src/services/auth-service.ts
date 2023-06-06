import User from '../models/user-model';
import { hashString, generateUUIDString, comparePassword } from '../utils/crypto-utils';
import mailService from './mail-service';
import UserDto from '../dtos/user-dto';
import tokenService from './token-service';
import { IUser } from '../types/user.type';
import ApiError from '../exceptions/api-error';

class AuthService {
  async registration(body: IUser) {
    const { email, password, phoneNumber, name } = body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw ApiError.BadRequest(`User with address ${email} already exist`);
    }

    const hashedPassword = await hashString(password || '');
    const activationLink = generateUUIDString();
    const user = await User.create({ email, password: hashedPassword, activationLink, phoneNumber, name });
    await mailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto._id, tokens.refreshToken);

    return { tokens, user: userDto };
  }

  async login(body: IUser) {
    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('User with such email does not exist');
    }

    const isPasswordCorrect = await comparePassword(password || '', user.password || '');

    if (!isPasswordCorrect) {
      throw ApiError.BadRequest('Wrong password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto._id, tokens.refreshToken);

    return { tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async activate(activationLink: string) {
    const user = await User.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest('Not correct link');
    }

    user.isActivated = true;
    await user.save();
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.Unauthorized();
    }

    const user = await User.findById(userData.id);

    if (!user) {
      throw ApiError.BadRequest('User does not exist');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens(userDto);

    await tokenService.saveToken(userDto._id, tokens.refreshToken);

    return { tokens, user: userDto };
  }
}

const authService = new AuthService();
export default authService;
