"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Container = _interopRequire(require("./Container"));

var Resolver = _interopRequire(require("./Resolver"));

Resolver.Container = Container;

module.exports = Resolver;