import express from 'express';
import { SaleController } from './sales.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.seller), SaleController.sellProduct);
router.get('/:history', auth(USER_ROLE.seller), SaleController.getSalesHistoryByInterval);
export const SalesRoutes = router;
