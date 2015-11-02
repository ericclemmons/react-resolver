"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = resolve;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Resolver = require("./Resolver");

var _Resolver2 = _interopRequireDefault(_Resolver);

var capitalize = function capitalize(word) {
  return word.replace(/^./, function (letter) {
    return letter.toUpperCase();
  });
};

function resolve(prop, promise) {
  var _ref;

  var asyncProps = arguments.length === 1 ? prop : (_ref = {}, _ref[prop] = promise, _ref);
  var asyncNames = Object.keys(asyncProps).map(capitalize).join("");

  return function resolveDecorator(Component) {
    var PropResolver = (function (_React$Component) {
      _inherits(PropResolver, _React$Component);

      function PropResolver() {
        _classCallCheck(this, PropResolver);

        _React$Component.apply(this, arguments);
      }

      PropResolver.prototype.render = function render() {
        var _this = this;

        return _react2["default"].createElement(
          _Resolver2["default"],
          { props: this.props, resolve: asyncProps },
          function (resolved) {
            return _react2["default"].createElement(Component, _extends({}, _this.props, resolved));
          }
        );
      };

      return PropResolver;
    })(_react2["default"].Component);

    ;
    PropResolver.displayName = asyncNames + "Resolver";
    return PropResolver;
  };
}

module.exports = exports["default"];