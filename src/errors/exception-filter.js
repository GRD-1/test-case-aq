const exceptionFilter = (err, req, res, next) => {
  console.error(`[Error]: ${err.message}`);

  let statusCode = err.statusCode;
  let message = err.message;
  if (!statusCode) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });

  next();
};

export default exceptionFilter;
