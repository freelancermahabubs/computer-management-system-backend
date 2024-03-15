import { SaleModel } from "../modules/Sales/sales.model";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getWeeklySales = async (): Promise<any[]> => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

  return SaleModel.find({ saleDate: { $gte: startOfWeek, $lte: endOfWeek } });
};

export const getDailySales = async (): Promise<any[]> => {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  return SaleModel.find({ saleDate: { $gte: startOfDay, $lte: endOfDay } });
};

export const getMonthlySales = async (): Promise<any[]> => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return SaleModel.find({ saleDate: { $gte: startOfMonth, $lte: endOfMonth } });
};

export const getYearlySales = async (): Promise<any[]> => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
  return SaleModel.find({ saleDate: { $gte: startOfYear, $lte: endOfYear } });
};
