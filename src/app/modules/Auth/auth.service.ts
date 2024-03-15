import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/AppError';

import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import { User } from '../user/user.model';

const loginUserIntoDB = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByUsername(payload.username);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  if (
    !payload ||
    !(await User.isPasswordMatched(payload.password, user.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match');
  }

  const jwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const token = createToken(jwtPayload, config.jwt_access_secret as string);

  return {
    token,
    user,
  };
};

const isPasswordInHistory = (
  newPassword: string,
  passwordHistory: { password: string; timestamp: Date }[],
) => {
  return passwordHistory.some(entry => entry.password === newPassword);
};

const updatePasswordHistory = (
  passwordHistory: { password: string; timestamp: Date }[],
  newPassword: string,
) => {
  const updatedHistory = [
    { password: newPassword, timestamp: new Date() },
    ...passwordHistory,
  ];

  // Limit the history to the last 2 passwords
  if (updatedHistory.length > 2) {
    updatedHistory.pop();
  }

  return updatedHistory;
};

const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await User.isUserExists(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    throw new Error('Current password is incorrect');
  }

  if (isPasswordInHistory(newPassword, user.passwordHistory)) {
    const lastUsedTimestamp = user.passwordHistory[0].timestamp;
    const formattedLastUsedTimestamp = lastUsedTimestamp.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Password change failed. Ensure the new password is unique and not among the last 2 used passwords (last used on ${formattedLastUsedTimestamp}).`,
    );
  }

  const updatedHistory = updatePasswordHistory(
    user.passwordHistory,
    newPassword,
  );

  const bcryptPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findByIdAndUpdate(user._id, {
    password: bcryptPassword,
    passwordHistory: updatedHistory,
  });

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const AuthServices = {
  loginUserIntoDB,
  changePassword,
};
