import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SaleServices } from './sales.service';

const sellProduct = catchAsync(async (req, res) => {
  const saleData = req.body;
  const sale = await SaleServices.sellProduct(saleData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Sale Item successfully',
    data: sale,
  });
});

const getSalesHistoryByInterval = catchAsync(async (req, res) => {
  const { history } = req.params;

  const salesHistory = await SaleServices.getSalesHistory(history);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sale History retrieved successfully',
    data: salesHistory,
  });
});

export const SaleController = {
  sellProduct,
  getSalesHistoryByInterval,
};
