export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // passes it into the base class of Error

    this.statusCode = statusCode;
    this.status = `${statusCode.startsWith('4') ? 'fail' : 'error'}`;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor); // prevents this function from polluting the stack trace
  }
}
