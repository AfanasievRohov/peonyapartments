import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

export const hashString = async (str: string) => {
  console.log(str);
  const hashedString = await bcrypt.hash(str, 10);

  return hashedString;
}

export const generateUUIDString = () => {
  const string = v4();

  return string;
}

export const comparePassword = async (rawPassword: string, hashedPassword: string) => {
  const isEqual = await bcrypt.compare(rawPassword, hashedPassword);

  return isEqual;
}