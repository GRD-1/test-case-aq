export class InternalError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'InternalError';
    this.statusCode = statusCode;
  }
}
