import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BrandServices } from './brand.service';

const createBrnad = catchAsync(async (req, res) => {
  const result = await BrandServices.createBrandIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Brand created successfully',
    data: result,
  });
});

const getAllBrands = catchAsync(async (req, res) => {
  const brands = await BrandServices.getAllBrandFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brands retrieved successfully',
    data: brands,
  });
});
export const BrandController = {
  createBrnad,
  getAllBrands,
};
