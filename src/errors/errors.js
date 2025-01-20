export class InternalError extends Error {
  constructor({ message, statusCode, cause }) {
    super(message);
    this.name = 'InternalError';
    this.statusCode = statusCode;
    this.cause = cause;
    this.stack = '';
  }
}
