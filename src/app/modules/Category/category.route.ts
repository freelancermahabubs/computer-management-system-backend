import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { CategoryValidations } from './category.validation';
import { CategoryController } from './category.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.seller),
  validateRequest(CategoryValidations.categoryValidationSchema),
  CategoryController.createCategory,
);
router.get('/', CategoryController.getAllCategories);
export const CategoryRoutes = router;
