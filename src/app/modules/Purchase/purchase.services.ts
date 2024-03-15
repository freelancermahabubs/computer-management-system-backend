/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TPurchase } from './purchase.interface';
import { PurchaseModel } from './purchase.model';
import AppError from '../../errors/AppError';
import {
  getDailyPurchases,
  getMonthlyPurchases,
  getWeeklyPurchases,
  getYearlyPurchases,
} from '../../utils/purchaseHistory';
import { ComputerItemModel } from '../ComputerItem/computerItem.model';

const createPurchase = async (payload: TPurchase): Promise<any> => {
  const computerItem = await ComputerItemModel.findById(payload.productId);
  if (computerItem) {
    const purchase = await PurchaseModel.create(payload);
    return purchase;
  }
};

const getPurchaseHistory = async (history: string): Promise<any[]> => {
  let purchases;

  switch (history) {
    case 'weekly':
      purchases = await getWeeklyPurchases();
      break;
    case 'daily':
      purchases = await getDailyPurchases();
      break;
    case 'monthly':
      purchases = await getMonthlyPurchases();
      break;
    case 'yearly':
      purchases = await getYearlyPurchases();
      break;
    default:
      throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid History');
  }
  purchases = await Promise.all(
    purchases?.map(async (purchase: any) => {
      return await PurchaseModel.populate(purchase, { path: 'productId' });
    }),
  );
  return purchases;
};

export const PurchaseServices = {
  createPurchase,
  getPurchaseHistory,
};
