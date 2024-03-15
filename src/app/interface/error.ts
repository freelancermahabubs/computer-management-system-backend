/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorSources = {
  path: string | number;
  message: string;
}[];
type errorDetail = {
  name: string;
  issues: any[];
};

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorDetails: errorDetail;
  errorMessage: string;
};

export type TDuplicateErrorResponse = {
  statusCode: number;
  message: string;
  errorDetails: TErrorSources;
  errorMessage: string;
};
export type TValiDationErrorResponse = {
  statusCode: number;
  message: string;
  errorDetails: TErrorSources;
  errorMessage: string;
};
export type TValiCastErrorResponse = {
  statusCode: number;
  message: string;
  errorDetails: TErrorSources;
  errorMessage: string;
};
