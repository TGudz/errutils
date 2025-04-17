export enum ErrorCode {
    MOBILE_REGISTERED = "MOBILE_REGISTERED",
    SUBJECT_NOT_FOUND = "SUBJECT_NOT_FOUND",
    BUSINESS_NOT_FOUND = "BUSINESS_NOT_FOUND",
    CREATOR_NOT_FOUND = "CREATOR_NOT_FOUND",
    PROMOTION_NOT_FOUND = "PROMOTION_NOT_FOUND",
    MOBILE_NOT_FOUND = "MOBILE_NOT_FOUND",
    SUBJECT_CREATION_FAILED = "SUBJECT_CREATION_FAILED",
    INVALID_ROLE = "INVALID_ROLE",
    INVALID_INPUT = "INVALID_INPUT",
    ALREADY_EXISTS = "ALREADY_EXISTS",
    MISSING_CREDENTIALS = "MISSING_CREDENTIALS",
    LOGIN_FAILED = "LOGIN_FAILED",
    RESET_LIMIT_EXCEEDED = "RESET_LIMIT_EXCEEDED",
    FAILED_TO_UPDATE = "FAILED_TO_UPDATE",
    MISSING_IDENTIFIER = "MISSING_IDENTIFIER",
    FAILED_TO_LIST_SUBJECTS = "FAILED_TO_LIST_SUBJECTS",
    FAILED_TO_DELETE = "FAILED_TO_DELETE",
    FAILED_TO_FETCH = "FAILED_TO_FETCH",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    INVALID_TOKEN = "INVALID_TOKEN",
}

export const ErrorMessage = {
    [ErrorCode.MOBILE_REGISTERED]: "Subject with this mobile already exists",
    [ErrorCode.SUBJECT_NOT_FOUND]: "Subject not found",
    [ErrorCode.BUSINESS_NOT_FOUND]: "Business not found",
    [ErrorCode.CREATOR_NOT_FOUND]: "Creator not found",
    [ErrorCode.PROMOTION_NOT_FOUND]: "Promotion not found",
    [ErrorCode.MOBILE_NOT_FOUND]: "Mobile number is required",
    [ErrorCode.SUBJECT_CREATION_FAILED]: "Failed to create subject entity",
    [ErrorCode.INVALID_ROLE]: "Invalid role",
    [ErrorCode.INVALID_INPUT]: "Missing or invalid input",
    [ErrorCode.ALREADY_EXISTS]: "Entity already exists",
    [ErrorCode.MISSING_CREDENTIALS]: "Missing login credentials",
    [ErrorCode.LOGIN_FAILED]: "Login failed",
    [ErrorCode.RESET_LIMIT_EXCEEDED]: "Too many reset attempts",
    [ErrorCode.FAILED_TO_UPDATE]: "Failed to update mobile",
    [ErrorCode.MISSING_IDENTIFIER]: "Missing identifier",
    [ErrorCode.FAILED_TO_LIST_SUBJECTS]: "Failed to list subject",
    [ErrorCode.FAILED_TO_DELETE]: "Failed to delete subject",
    [ErrorCode.FAILED_TO_FETCH]: "Failed to get subject",
    [ErrorCode.UNAUTHORIZED]: "Unauthorized. Please log in.",
    [ErrorCode.FORBIDDEN]: "Access denied. Insufficient permissions.",
    [ErrorCode.INVALID_TOKEN]: "Invalid authentication token",
};

// 3. Error object structure (now with optional `details`)

export type ErrorResponseDetails = {
    id?: string;
    mobile?: string;
    email?: string;
    role?: string;
    subjectId?: string;
    adminId?: string;
    [key: string]: any; // allow additional custom info
};


export type ErrorResponse = {
    error: {
        code: ErrorCode;
        message: string;
        details?: ErrorResponseDetails;
    };
};


export const resolveStatusFromErrorCode = (code: ErrorCode): number => {
    switch (code) {
        case ErrorCode.MOBILE_REGISTERED:
        case ErrorCode.ALREADY_EXISTS:
            return 409;
        case ErrorCode.SUBJECT_NOT_FOUND:
        case ErrorCode.BUSINESS_NOT_FOUND:
        case ErrorCode.CREATOR_NOT_FOUND:
        case ErrorCode.MOBILE_NOT_FOUND:
        case ErrorCode.PROMOTION_NOT_FOUND:
            return 404;
        case ErrorCode.INVALID_INPUT:
        case ErrorCode.INVALID_ROLE:
        case ErrorCode.MISSING_CREDENTIALS:
        case ErrorCode.MISSING_IDENTIFIER:
        case ErrorCode.SUBJECT_CREATION_FAILED:
        case ErrorCode.LOGIN_FAILED:
        case ErrorCode.RESET_LIMIT_EXCEEDED:
        case ErrorCode.FAILED_TO_UPDATE:
        case ErrorCode.FAILED_TO_LIST_SUBJECTS:
        case ErrorCode.FAILED_TO_DELETE:
        case ErrorCode.FAILED_TO_FETCH:
            return 400;
        case ErrorCode.UNAUTHORIZED:
        case ErrorCode.INVALID_TOKEN:
            return 401;
        case ErrorCode.FORBIDDEN:
            return 403;
        default:
            return 500;
    }
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
