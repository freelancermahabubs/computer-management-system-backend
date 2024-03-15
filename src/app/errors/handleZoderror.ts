import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleZoderror = (error: ZodError): TGenericErrorResponse => {
  const errorDetails: TErrorSources = error?.issues?.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path?.length - 1],
      message: issue.message,
    };
  });
  const userFriendlyErrors = [
    ...errorDetails.map(detail => `${detail.message}`),
  ];
  const combinedErrorMessage: string = userFriendlyErrors.join('. ');

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: combinedErrorMessage,
    errorDetails: {
      name: 'zod error',
      issues: error.issues,
    },
  };
};
export default handleZoderror;
