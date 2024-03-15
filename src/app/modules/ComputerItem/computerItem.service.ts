import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TComputerItem } from './computerItem.interface';
import { ComputerItemModel } from './computerItem.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ItemSearchableFields } from './computeritem.const';

const createComputerItemIntoDB = async (Payload: TComputerItem) => {
  const result = await ComputerItemModel.create(Payload);
  return result;
};

const deleteComputerItemFromDB = async (id: string) => {
  const deletedComputer = await ComputerItemModel.findByIdAndDelete(id);
  if (!deletedComputer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Computer not found');
  }
  return deletedComputer;
};

const getAllComputerItemFromDB = async (query: Record<string, unknown>) => {
  const computerItemsQuery = new QueryBuilder(ComputerItemModel.find(), query)
    .search(ItemSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await computerItemsQuery.modelQuery
    .populate('category') 
    .populate('brand');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Computer Item not found');
  }
  return result;
};
const getSingleComputerItemFromDB = async (
  id: string,
): Promise<TComputerItem | null> => {
  const computer = await ComputerItemModel.findById(id);
  return computer;
};

const updateComputerItemInDB = async (
  id: string,
  updatedData: Partial<TComputerItem>,
): Promise<TComputerItem | null> => {
  const updatedComputer = await ComputerItemModel.findByIdAndUpdate(
    id,
    updatedData,
    { new: true },
  );
  return updatedComputer;
};
export const ComputerItemServices = {
  createComputerItemIntoDB,
  getSingleComputerItemFromDB,
  updateComputerItemInDB,
  deleteComputerItemFromDB,
  getAllComputerItemFromDB,
};
