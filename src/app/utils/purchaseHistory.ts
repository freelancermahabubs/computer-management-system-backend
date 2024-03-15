/* eslint-disable @typescript-eslint/no-explicit-any */
import { PurchaseModel } from '../modules/Purchase/purchase.model';

export const getWeeklyPurchases = async (): Promise<any[]> => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

  return PurchaseModel.find({ purchaseDate: { $gte: startOfWeek, $lte: endOfWeek } });
};

export const getDailyPurchases = async (): Promise<any[]> => {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  return PurchaseModel.find({ purchaseDate: { $gte: startOfDay, $lte: endOfDay } });
};

export const getMonthlyPurchases = async (): Promise<any[]> => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return PurchaseModel.find({ purchaseDate: { $gte: startOfMonth, $lte: endOfMonth } });
};

export const getYearlyPurchases = async (): Promise<any[]> => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
  return PurchaseModel.find({ purchaseDate: { $gte: startOfYear, $lte: endOfYear } });
};
