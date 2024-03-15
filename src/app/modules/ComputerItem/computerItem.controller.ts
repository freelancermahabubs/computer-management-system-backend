import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ComputerItemServices } from './computerItem.service';

const createItem = catchAsync(async (req, res) => {
  const result = await ComputerItemServices.createComputerItemIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Item created successfully',
    data: result,
  });
});

const getSingleItemById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const responseData =
    await ComputerItemServices.getSingleComputerItemFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Item retrieved successfully',
    data: responseData,
  });
});

const updateItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const updatedItem = await ComputerItemServices.updateComputerItemInDB(
    id,
    payload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item updated successfully',
    data: updatedItem,
  });
});
const deleteItem = catchAsync(async (req, res) => {
  const { id } = req.params;
  await ComputerItemServices.deleteComputerItemFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item Delete successfully',
    data: null,
  });
});

const getAllComputerItem = catchAsync(async (req, res) => {
  const items = await ComputerItemServices.getAllComputerItemFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Items retrieved successfully',
    data: items,
  });
});
export const ComputerItemController = {
  createItem,
  getSingleItemById,
  updateItem,
  deleteItem,
  getAllComputerItem,
};
