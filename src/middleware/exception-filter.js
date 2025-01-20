import { INTERNAL_ERROR_CODES, INTERNAL_ERROR_TO_HTTP } from '../errors/error-codes';
import { InternalError } from '../errors/errors';

const exceptionFilter = (err, req, res, next) => {
  console.log(err);
  let statusCode = 500;
  let message = 'Internal server error';
  let isTimeout;

  if (err instanceof InternalError) {
    const httpError = INTERNAL_ERROR_TO_HTTP[err.statusCode];
    const isBadReq = err.statusCode === INTERNAL_ERROR_CODES.BAD_REQUEST;
    isTimeout = err.statusCode === INTERNAL_ERROR_CODES.TIMEOUT_EXPIRED;

    statusCode = httpError.statusCode;
    message = isBadReq || isTimeout ? `${httpError.message}: ${err.message}` : httpError.message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
  res.json = () => null;

  next();
};

export default exceptionFilter;
