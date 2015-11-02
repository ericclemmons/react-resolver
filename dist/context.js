"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = context;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function context(name) {
  var type = arguments.length <= 1 || arguments[1] === undefined ? _react2["default"].PropTypes.any.isRequired : arguments[1];

  return function contextDecorator(Component) {
    var _ContextDecorator$contextTypes;

    var ContextDecorator = (function (_React$Component) {
      _inherits(ContextDecorator, _React$Component);

      function ContextDecorator() {
        _classCallCheck(this, ContextDecorator);

        _React$Component.apply(this, arguments);
      }

      ContextDecorator.prototype.render = function render() {
        return _react2["default"].createElement(Component, _extends({}, this.context, this.props));
      };

      return ContextDecorator;
    })(_react2["default"].Component);

    ContextDecorator.contextTypes = (_ContextDecorator$contextTypes = {}, _ContextDecorator$contextTypes[name] = type, _ContextDecorator$contextTypes);
    ContextDecorator.displayName = "ContextDecorator";

    return ContextDecorator;
  };
}

module.exports = exports["default"];