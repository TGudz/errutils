export enum ErrorCode {
    MOBILE_REGISTERED = "MOBILE_REGISTERED",
    USER_NOT_FOUND = "USER_NOT_FOUND",
    BUSINESS_NOT_FOUND = "BUSINESS_NOT_FOUND",
    CREATOR_NOT_FOUND = "CREATOR_NOT_FOUND",
    MOBILE_NOT_FOUND = "MOBILE_NOT_FOUND",
    SUBJECT_CREATION_FAILED = "SUBJECT_CREATION_FAILED",
    INVALID_ROLE = "INVALID_ROLE",
    INVALID_INPUT = "INVALID_INPUT",
    ALREADY_EXISTS = "ALREADY_EXISTS",
}

export const ErrorMessage = {
    [ErrorCode.MOBILE_REGISTERED]: "User with this mobile already exists",
    [ErrorCode.USER_NOT_FOUND]: "User not found",
    [ErrorCode.BUSINESS_NOT_FOUND]: "Business not found",
    [ErrorCode.CREATOR_NOT_FOUND]: "Creator not found",
    [ErrorCode.MOBILE_NOT_FOUND]: "Mobile number is required",
    [ErrorCode.SUBJECT_CREATION_FAILED]: "Failed to create subject entity",
    [ErrorCode.INVALID_ROLE]: "Invalid role",
    [ErrorCode.INVALID_INPUT]: "Missing or invalid input",
    [ErrorCode.ALREADY_EXISTS]: "Entity already exists",
};

// 3. Error object structure (now with optional `details`)
export type ErrorResponse = {
    error: {
      code: ErrorCode;
      message: string;
      details?: {
        id?: string;
        mobile?: string;
        email?: string;
        role?: string;
        subjectId?: string;
        adminId?: string;
        [key: string]: any; // allow additional custom info
      };
    };
  };
  

export const Errors = {
    mobileRegistered: (): ErrorResponse => ({
        error: { code: ErrorCode.MOBILE_REGISTERED, message: ErrorMessage[ErrorCode.MOBILE_REGISTERED] }
    }),
    userNotFound: (): ErrorResponse => ({
        error: { code: ErrorCode.USER_NOT_FOUND, message: ErrorMessage[ErrorCode.USER_NOT_FOUND] }
    }),
    businessNotFound: (): ErrorResponse => ({
        error: { code: ErrorCode.BUSINESS_NOT_FOUND, message: ErrorMessage[ErrorCode.BUSINESS_NOT_FOUND] }
    }),
    creatorNotFound: (): ErrorResponse => ({
        error: { code: ErrorCode.CREATOR_NOT_FOUND, message: ErrorMessage[ErrorCode.CREATOR_NOT_FOUND] }
    }),
    mobileNotFound: (): ErrorResponse => ({
        error: { code: ErrorCode.MOBILE_NOT_FOUND, message: ErrorMessage[ErrorCode.MOBILE_NOT_FOUND] }
    }),
    subjectCreationFailed: (): ErrorResponse => ({
        error: { code: ErrorCode.SUBJECT_CREATION_FAILED, message: ErrorMessage[ErrorCode.SUBJECT_CREATION_FAILED] }
    }),
    invalidRole: (): ErrorResponse => ({
        error: { code: ErrorCode.INVALID_ROLE, message: ErrorMessage[ErrorCode.INVALID_ROLE] }
    }),
    invalidInput: (): ErrorResponse => ({
        error: { code: ErrorCode.INVALID_INPUT, message: ErrorMessage[ErrorCode.INVALID_INPUT] }
    }),
    alreadyExists: (): ErrorResponse => ({
        error: { code: ErrorCode.ALREADY_EXISTS, message: ErrorMessage[ErrorCode.ALREADY_EXISTS] }
    }),
};

export const isError = (obj: any): boolean => {
    if (!obj || typeof obj !== "object") return false;

    const err = obj.error;
    return (
        err &&
        typeof err === "object" &&
        typeof err.code === "string" &&
        typeof err.message === "string"
    );
};
