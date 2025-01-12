import { INTERNAL_ERROR_CODES, INTERNAL_ERROR_TO_HTTP } from './error-codes';
import { InternalError } from './errors';

const exceptionFilter = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (err instanceof InternalError) {
    const httpError = INTERNAL_ERROR_TO_HTTP[err.statusCode];
    const isBadRequest = err.statusCode === INTERNAL_ERROR_CODES.BAD_REQUEST;

    statusCode = httpError.statusCode;
    message = isBadRequest ? `${httpError.message}: ${err.message}` : httpError.message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });

  next();
};

export default exceptionFilter;
