export const INTERNAL_ERROR_CODES = {
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_DATA: 'INVALID_DATA',
  RECORD_NOT_FOUND: 'RECORD_NOT_FOUND',
  UNIQUE_VIOLATION: 'UNIQUE_VIOLATION',
  BAD_REQUEST: 'BAD_REQUEST',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  ENV_VALIDATION_ERROR: 'ENV_VALIDATION_ERROR',
  UNCONFIRMED_EMAIL: 'UNCONFIRMED_EMAIL',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  TO_MANY_REQUESTS: 'TO_MANY_REQUESTS',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  TIMEOUT_EXPIRED: 'TIMEOUT_EXPIRED',
};

export const INTERNAL_ERROR_TO_HTTP = {
  [INTERNAL_ERROR_CODES.INTERNAL_SERVER_ERROR]: {
    error: true,
    statusCode: 500,
    message: 'Internal server error',
  },
  [INTERNAL_ERROR_CODES.UNAUTHORIZED]: {
    error: true,
    statusCode: 401,
    message: 'Unauthorized',
  },
  [INTERNAL_ERROR_CODES.FORBIDDEN]: {
    error: true,
    statusCode: 403,
    message: 'Access denied',
  },
  [INTERNAL_ERROR_CODES.INVALID_DATA]: {
    error: true,
    statusCode: 422,
    message: 'Invalid data',
  },
  [INTERNAL_ERROR_CODES.RECORD_NOT_FOUND]: {
    error: true,
    statusCode: 401,
    message: 'Not found',
  },
  [INTERNAL_ERROR_CODES.UNIQUE_VIOLATION]: {
    error: true,
    statusCode: 422,
    message: 'Unique key violation',
  },
  [INTERNAL_ERROR_CODES.BAD_REQUEST]: {
    error: true,
    statusCode: 400,
    message: 'Bad Request',
  },
  [INTERNAL_ERROR_CODES.INVALID_CREDENTIALS]: {
    error: true,
    statusCode: 401,
    message: 'Authorization failed',
  },
  [INTERNAL_ERROR_CODES.ENV_VALIDATION_ERROR]: {
    error: true,
    statusCode: 500,
    message: 'Internal server error',
  },
  [INTERNAL_ERROR_CODES.UNCONFIRMED_EMAIL]: {
    error: true,
    statusCode: 401,
    message: 'Unconfirmed email',
  },
  [INTERNAL_ERROR_CODES.SERVICE_UNAVAILABLE]: {
    error: true,
    statusCode: 503,
    message: 'Service is unavailable now',
  },
  [INTERNAL_ERROR_CODES.TO_MANY_REQUESTS]: {
    error: true,
    statusCode: 429,
    message: 'To many requests',
  },
  [INTERNAL_ERROR_CODES.INVALID_RESPONSE]: {
    error: true,
    statusCode: 500,
    message: 'Internal server error',
  },
  [INTERNAL_ERROR_CODES.TIMEOUT_EXPIRED]: {
    error: true,
    statusCode: 408,
    message: `Request Timeout`,
  },
};
