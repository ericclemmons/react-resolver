export default class ResolverError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;

    if (Error.hasOwnProperty("captureStackTrace")) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }
}
