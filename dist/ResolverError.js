"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResolverError = (function (_Error) {
  _inherits(ResolverError, _Error);

  function ResolverError(message) {
    _classCallCheck(this, ResolverError);

    _Error.call(this, message);

    this.name = this.constructor.name;
    this.message = message;

    if (Error.hasOwnProperty("captureStackTrace")) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }

  return ResolverError;
})(Error);

exports["default"] = ResolverError;
module.exports = exports["default"];