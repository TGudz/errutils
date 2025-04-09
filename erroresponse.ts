import { Response } from 'express';
import { isError, ErrorResponse, ErrorCode, ErrorMessage } from './errors';

export const resolveStatusFromErrorCode = (code: ErrorCode): number => {
  switch (code) {
    case ErrorCode.MOBILE_REGISTERED:
    case ErrorCode.ALREADY_EXISTS:
      return 409;
    case ErrorCode.USER_NOT_FOUND:
    case ErrorCode.BUSINESS_NOT_FOUND:
    case ErrorCode.CREATOR_NOT_FOUND:
    case ErrorCode.MOBILE_NOT_FOUND:
      return 404;
    case ErrorCode.INVALID_INPUT:
    case ErrorCode.INVALID_ROLE:
      return 400;
    case ErrorCode.SUBJECT_CREATION_FAILED:
    default:
      return 500;
  }
}

export const resolveStatus = (error: ErrorResponse): number => {
    return resolveStatusFromErrorCode(error.error.code);
};

export const sendErrorResponseOnError = (res: Response, result: any): boolean => {
  if (isError(result)) {
    res.status(resolveStatus(result)).json(result);
    return true;
  }
  return false;
};

export const createErrorResponse = (
  code: ErrorCode,
  details?: ErrorResponse["error"]["details"]
): ErrorResponse => ({
  error: {
    code,
    message: ErrorMessage[code] || "Unknown error",
    ...(details ? { details } : {}),
  },
});

export const sendErrorResponse = (
  res: Response,
  code: ErrorCode,
  details?: ErrorResponse["error"]["details"]
): void => {
  const status = resolveStatusFromErrorCode(code);
  const errorResponse = createErrorResponse(code, details);
  res.status(status).json(errorResponse);
};
