/* eslint-disable @typescript-eslint/no-explicit-any */
import { TDuplicateErrorResponse, TErrorSources } from '../interface/error';

const handleDuplicateError = (error: any): TDuplicateErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorDetails: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
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

export default handleDuplicateError;
