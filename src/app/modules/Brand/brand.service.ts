/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { BrandSearchableFields } from './brand.const';
import { TBrand } from './brand.interface';
import { BrandModel } from './brand.model';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';

const createBrandIntoDB = async (Payload: TBrand) => {
  const result = await BrandModel.create(Payload);
  return result;
};
const getAllBrandFromDB = async (query: Record<string, unknown>) => {
  const brandQuery = new QueryBuilder(BrandModel.find(), query)
    .search(BrandSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await brandQuery.modelQuery;
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }
  return result;
};
export const BrandServices = {
  createBrandIntoDB,
  getAllBrandFromDB,
};
