import express from 'express';

import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';
import { PurchaseController } from './purchase.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.buyer), PurchaseController.purchaseItem);
router.get('/:history', auth(USER_ROLE.buyer), PurchaseController.getPurchasesHistoryByInterval);
export const PurchaseRoutes = router;
