/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const user = await User.create(payload);
  const { passwordHistory, password, ...sanitizedUser } = user.toObject();
  return sanitizedUser;
};
export const UserServices = {
  createUserIntoDB,
};
