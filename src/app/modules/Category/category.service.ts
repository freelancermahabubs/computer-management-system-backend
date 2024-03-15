/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TCategory } from './category.interface';
import { CategoryModel } from './category.model';
import { CategorySearchableFields } from './category.const';

const createCategoryIntoDB = async (Payload: TCategory) => {
  const result = await CategoryModel.create(Payload);
  return result;
};
const getAllCategoryFromDB = async (query: Record<string, unknown>) => {
  const categoryQuery = new QueryBuilder(CategoryModel.find(), query)
    .search(CategorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await categoryQuery.modelQuery;
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return result;
};
export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
