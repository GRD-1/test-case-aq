class InternalError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalError';
  }
}
global.InternalError = InternalError;

class ValidationError extends InternalError {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}
global.ValidationError = ValidationError;
