import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { ComputerItemValidations } from './computerItem.validation';
import { ComputerItemController } from './computerItem.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.seller),
  validateRequest(ComputerItemValidations.ComputerItemValidationSchema),
  ComputerItemController.createItem,
);
router.get(
  '/',
  auth(USER_ROLE.seller, USER_ROLE.buyer),
  ComputerItemController.getAllComputerItem,
);
router.get(
  '/:id',
  auth(USER_ROLE.seller, USER_ROLE.buyer),
  ComputerItemController.getSingleItemById,
);
router.patch('/:id', auth(USER_ROLE.seller), ComputerItemController.updateItem);
router.delete(
  '/:id',
  auth(USER_ROLE.seller),
  ComputerItemController.deleteItem,
);

export const ComputerItemRoutes = router;
