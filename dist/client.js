"use strict";

exports.__esModule = true;
exports["default"] = client;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function client(Loader) {
  return function clientDecorator(Component) {
    var ClientResolver = (function (_React$Component) {
      _inherits(ClientResolver, _React$Component);

      function ClientResolver(props, context) {
        _classCallCheck(this, ClientResolver);

        _React$Component.call(this, props, context);

        this.state = { visible: process.env.NODE_ENV === "test" };
      }

      ClientResolver.prototype.componentDidMount = function componentDidMount() {
        this.setState({ visible: true });
      };

      ClientResolver.prototype.render = function render() {
        if (!this.state.visible) {
          return Loader ? _react2["default"].createElement(Loader, null) : null;
        }

        return _react2["default"].createElement(Component, this.props);
      };

      return ClientResolver;
    })(_react2["default"].Component);

    ;
    ClientResolver.displayName = "ClientResolver";
    return ClientResolver;
  };
}

module.exports = exports["default"];