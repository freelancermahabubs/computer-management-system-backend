/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserIntoDB(req.body);

  const { user, token } = result;

  const sanitizedUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    name: user.name,
  };
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: {
      token,
      user: sanitizedUser,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const userId: any = { _id: req.user._id };
  const { currentPassword, newPassword } = req.body;

  try {
    const result = await AuthServices.changePassword(
      userId,
      currentPassword,
      newPassword,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: error.message,
        data: null,
      });
    }
  }
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
