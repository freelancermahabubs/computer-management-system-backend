import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { UserControllers } from '../user/user.controller';
import { UserValidation } from '../user/user.validation';
import auth from '../../middlwares/auth';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateRequest(UserValidation.UserValidationSchema),
  UserControllers.registerUserIntoDB,
);
authRouter.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

authRouter.post(
  '/change-password',
  auth('seller', 'buyer'),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = authRouter;
