import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PurchaseServices } from './purchase.services';

const purchaseItem = catchAsync(async (req, res) => {
  const purchase = await PurchaseServices.createPurchase(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Purchase created successfully',
    data: purchase,
  });
});

const getPurchasesHistoryByInterval = catchAsync(async (req, res) => {
  const { history } = req.params;

  const purchaseHistory = await PurchaseServices.getPurchaseHistory(history);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Purchase History retrieved successfully',
    data: purchaseHistory,
  });
});

export const PurchaseController = {
  purchaseItem,
  getPurchasesHistoryByInterval,
};
