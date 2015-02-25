"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Resolver = _interopRequire(require("./resolver"));

var mixin = _interopRequire(require("./mixin"));

var utils = _interopRequire(require("./utils"));

Resolver.mixin = mixin;
Resolver.utils = utils;

module.exports = Resolver;