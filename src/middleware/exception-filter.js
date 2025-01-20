import { INTERNAL_ERROR_TO_HTTP, INTERNAL_ERRORS } from '../errors/error-codes';
import { InternalError } from '../errors/errors';

const exceptionFilter = (err, req, res, next) => {
  console.log(err);
  let statusCode = 500;
  let message = 'Internal server error';

  if (err instanceof InternalError) {
    const httpError = INTERNAL_ERROR_TO_HTTP[err.statusCode];
    const isBadReq = err.statusCode === INTERNAL_ERRORS.BAD_REQUEST.statusCode;

    statusCode = httpError.statusCode;
    message = isBadReq ? `${httpError.message}: ${err.cause}` : httpError.message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });

  next();
};

export default exceptionFilter;
