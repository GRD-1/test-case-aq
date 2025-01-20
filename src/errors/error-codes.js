export const INTERNAL_ERRORS = {
  INTERNAL_SERVER_ERROR: {
    statusCode: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
    cause: '',
  },
  UNAUTHORIZED: {
    statusCode: 'UNAUTHORIZED',
    message: 'Authorization is failed',
    cause: '',
  },
  FORBIDDEN: {
    statusCode: 'FORBIDDEN',
    message: 'Access denied',
    cause: '',
  },
  UNPROCESSABLE_ENTITY: {
    statusCode: 'UNPROCESSABLE_ENTITY',
    message: 'Invalid data in request body',
    cause: '',
  },
  RECORD_NOT_FOUND: {
    statusCode: 'RECORD_NOT_FOUND',
    message: 'Record not found',
    cause: '',
  },
  UNIQUE_VIOLATION: {
    statusCode: 'UNIQUE_VIOLATION',
    message: 'Unique key violation',
    cause: '',
  },
  BAD_REQUEST: {
    statusCode: 'BAD_REQUEST',
    message: 'Invalid request params or query',
    cause: '',
  },
  ENV_VALIDATION_ERROR: {
    statusCode: 'ENV_VALIDATION_ERROR',
    message: 'Invalid environment variable',
    cause: '',
  },
  UNCONFIRMED_EMAIL: {
    statusCode: 'UNCONFIRMED_EMAIL',
    message: 'The email address is unconfirmed',
    cause: '',
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 'SERVICE_UNAVAILABLE',
    message: 'External service is unavailable',
    cause: '',
  },
  TO_MANY_REQUESTS: {
    statusCode: 'TO_MANY_REQUESTS',
    message: 'To many requests',
    cause: '',
  },
  INVALID_RESPONSE: {
    statusCode: 'INVALID_RESPONSE',
    message: 'Response validation error. The violation of the Method contract',
    cause: '',
  },
  TIMEOUT_EXPIRED: {
    statusCode: 'TIMEOUT_EXPIRED',
    message: 'Request timed out. The Process terminated by server',
    cause: '',
  },
  INVALID_CREDENTIALS: {
    statusCode: 'INVALID_CREDENTIALS',
    message: 'Internal credentials',
    cause: '',
  },
};

export const INTERNAL_ERROR_TO_HTTP = {
  [INTERNAL_ERRORS.INTERNAL_SERVER_ERROR.statusCode]: {
    error: true,
    statusCode: 500,
    message: 'Internal server error',
  },
  [INTERNAL_ERRORS.UNAUTHORIZED.statusCode]: {
    error: true,
    statusCode: 401,
    message: 'Unauthorized',
  },
  [INTERNAL_ERRORS.FORBIDDEN.statusCode]: {
    error: true,
    statusCode: 403,
    message: 'Access denied',
  },
  [INTERNAL_ERRORS.UNPROCESSABLE_ENTITY.statusCode]: {
    error: true,
    statusCode: 422,
    message: 'Invalid data in request body',
  },
  [INTERNAL_ERRORS.RECORD_NOT_FOUND.statusCode]: {
    error: true,
    statusCode: 401,
    message: 'Not found',
  },
  [INTERNAL_ERRORS.UNIQUE_VIOLATION.statusCode]: {
    error: true,
    statusCode: 422,
    message: 'Unique key violation',
  },
  [INTERNAL_ERRORS.BAD_REQUEST.statusCode]: {
    error: true,
    statusCode: 400,
    message: 'Bad Request',
  },
  [INTERNAL_ERRORS.INVALID_CREDENTIALS.statusCode]: {
    error: true,
    statusCode: 401,
    message: 'Authorization failed',
  },
  [INTERNAL_ERRORS.ENV_VALIDATION_ERROR.statusCode]: {
    error: true,
    statusCode: 500,
    message: 'Internal server error',
  },
  [INTERNAL_ERRORS.UNCONFIRMED_EMAIL.statusCode]: {
    error: true,
    statusCode: 401,
    message: 'Unconfirmed email',
  },
  [INTERNAL_ERRORS.SERVICE_UNAVAILABLE.statusCode]: {
    error: true,
    statusCode: 503,
    message: 'Service is unavailable now',
  },
  [INTERNAL_ERRORS.TO_MANY_REQUESTS.statusCode]: {
    error: true,
    statusCode: 429,
    message: 'To many requests',
  },
  [INTERNAL_ERRORS.INVALID_RESPONSE.statusCode]: {
    error: true,
    statusCode: 500,
    message: 'Internal server error',
  },
  [INTERNAL_ERRORS.TIMEOUT_EXPIRED.statusCode]: {
    error: true,
    statusCode: 408,
    message: 'Request timed out. The Process terminated by server',
  },
};
