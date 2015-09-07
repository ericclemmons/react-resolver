export default class ResolverError extends Error {
  constructor(message, data) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
    this.data = data;

    if (Error.hasOwnProperty("captureStackTrace")) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }
}
