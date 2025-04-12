import { Response } from 'express';
import {
  isError,
  ErrorResponse,
  ErrorCode,
  ErrorMessage,
  resolveStatusFromErrorCode,
  ErrorResponseDetails
} from './errors';


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
  details?: ErrorResponseDetails
): void => {
  const status = resolveStatusFromErrorCode(code);
  const errorResponse = createErrorResponse(code, details);
  res.status(status).json(errorResponse);
};



export const Errors = {
  mobileRegistered: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.MOBILE_REGISTERED, details),

  subjectNotFound: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.SUBJECT_NOT_FOUND, details),

  businessNotFound: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.BUSINESS_NOT_FOUND, details),

  creatorNotFound: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.CREATOR_NOT_FOUND, details),

  mobileNotFound: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.MOBILE_NOT_FOUND, details),

  subjectCreationFailed: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.SUBJECT_CREATION_FAILED, details),

  invalidRole: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.INVALID_ROLE, details),

  invalidInput: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.INVALID_INPUT, details),

  alreadyExists: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.ALREADY_EXISTS, details),

  // 🔐 Auth-related:
  unauthorized: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.UNAUTHORIZED, details),

  forbidden: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.FORBIDDEN, details),

  invalidToken: (details?: ErrorResponseDetails): ErrorResponse =>
    createErrorResponse(ErrorCode.INVALID_TOKEN, details),
};
