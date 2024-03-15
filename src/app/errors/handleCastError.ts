import mongoose from 'mongoose';
import { TErrorSources, TValiCastErrorResponse } from '../interface/error';

const handleCastError = (
  error: mongoose.Error.CastError,
): TValiCastErrorResponse => {
  const errorDetails: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  const userFriendlyErrors = [
    ...errorDetails.map(detail => `${detail.message}`),
  ];
  const combinedErrorMessage: string = userFriendlyErrors.join('. ');
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage: combinedErrorMessage,
    errorDetails,
  };
};

export default handleCastError;
