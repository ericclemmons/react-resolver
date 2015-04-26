"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ResolverError = (function (_Error) {
  function ResolverError(message) {
    _classCallCheck(this, ResolverError);

    var _this = new _Error(message);

    _this.__proto__ = ResolverError.prototype;

    _this.name = _this.constructor.name;
    _this.message = message;

    if (Error.hasOwnProperty("captureStackTrace")) {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error().stack;
    }
    return _this;
  }

  _inherits(ResolverError, _Error);

  return ResolverError;
})(Error);

exports["default"] = ResolverError;
module.exports = exports["default"];