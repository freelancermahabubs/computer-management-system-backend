/* eslint-disable @typescript-eslint/no-explicit-any */
import { SaleModel } from './sales.model';
import { TSales } from './sales.interface';
import { ComputerItemModel } from '../ComputerItem/computerItem.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import {
  getDailySales,
  getMonthlySales,
  getWeeklySales,
  getYearlySales,
} from '../../utils/saleHistory';
// import moment from 'moment';

const sellProduct = async (payload: TSales): Promise<any> => {
  const { productId, quantitySold } = payload;

  const computerItem = await ComputerItemModel.findById(productId);

  if (!computerItem || computerItem.productQuantity < quantitySold) {
    throw new AppError(
      httpStatus.INSUFFICIENT_STORAGE,
      'Insufficient quantity in the inventory',
    );
  }

  computerItem.productQuantity -= quantitySold;

  // Remove product from inventory if quantity reaches zero
  if (computerItem.productQuantity <= 0) {
    ((await computerItem) as any).remove();
  } else {
    await computerItem.save();
  }

  // Create sale record
  const sale = await SaleModel.create(payload);
  return sale;
};

const getSalesHistory = async (history: string): Promise<any[]> => {
  let sales;

  switch (history) {
    case 'weekly':
      sales = await getWeeklySales();
      break;
    case 'daily':
      sales = await getDailySales();
      break;
    case 'monthly':
      sales = await getMonthlySales();
      break;
    case 'yearly':
      sales = await getYearlySales();
      break;
    default:
      throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid History');
  }

  // Populating each sale item's productId field
  sales = await Promise.all(
    sales?.map(async (sale: any) => {
      return await SaleModel.populate(sale, { path: 'productId' });
    }),
  );

  return sales;
};

export const SaleServices = {
  sellProduct,
  getSalesHistory,
};
