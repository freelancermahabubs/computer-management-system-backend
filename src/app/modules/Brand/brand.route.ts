import express from 'express';
import validateRequest from '../../middlwares/validateRequest';

import { BrandValidations } from './brand.validation';
import { BrandController } from './brand.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.seller),
  validateRequest(BrandValidations.brandValidationSchema),
  BrandController.createBrnad,
);
router.get('/', BrandController.getAllBrands);
export const BrandRoutes = router;
