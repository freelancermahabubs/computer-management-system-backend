import mongoose from 'mongoose';
import { TErrorSources, TValiDationErrorResponse } from '../interface/error';

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TValiDationErrorResponse => {
  const errorDetails: TErrorSources = Object.values(error.errors)?.map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const userFriendlyErrors = [
    ...errorDetails.map(detail => `${detail.message}`),
  ];
  const combinedErrorMessage: string = userFriendlyErrors.join('. ');

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: combinedErrorMessage,
    errorDetails,
  };
};

export default handleValidationError;
