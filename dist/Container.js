"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require("react/addons");

var _React2 = _interopRequireWildcard(_React);

var _ResolverError = require("./ResolverError");

var _ResolverError2 = _interopRequireWildcard(_ResolverError);

var Children = _React2["default"].Children;
var cloneWithProps = _React2["default"].addons.cloneWithProps;

var Container = (function (_React$Component) {
  function Container(props, context) {
    _classCallCheck(this, Container);

    _get(Object.getPrototypeOf(Container.prototype), "constructor", this).call(this, props, context);

    this.id = this.getResolver().getContainerId(this);
    this.state = this.getResolver().getContainerState(this);
  }

  _inherits(Container, _React$Component);

  _createClass(Container, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this = this;

      if (!this.state.fulfilled) {
        this.getResolver().resolve(this, function (state) {
          return new Promise(function (resolve) {
            _this.setState(state, resolve);
          });
        });
      }
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      var parent = this;
      var resolver = this.getResolver();

      return {
        parent: parent,
        resolver: resolver };
    }
  }, {
    key: "getResolver",
    value: function getResolver() {
      var resolver = this.props.resolver || this.context.resolver;

      if (!resolver) {
        throw new ReferenceError("Resolver is not defined in either `context` or `props`.  (Perhaps missing a root <Container resolver={new Resolver()} />?)");
      }

      return resolver;
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(props, state) {
      return state.fulfilled;
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.fulfilled) {
        return false;
      }

      if (this.props.component) {
        return _React2["default"].createElement(this.props.component, this.state.values);
      }

      if (this.props.element) {
        return cloneWithProps(this.props.element);
      }

      if (this.props.children) {
        if (Children.count(this.props.children) === 1) {
          return cloneWithProps(Children.only(this.props.children));
        }
        return _React2["default"].createElement(
          "span",
          null,
          Children.map(this.props.children, cloneWithProps)
        );
      }

      throw new _ResolverError2["default"]("<Container /> requires one of the following props to render: `element`, `component`, or `children`");
    }
  }]);

  return Container;
})(_React2["default"].Component);

Container.childContextTypes = {
  parent: _React2["default"].PropTypes.instanceOf(Container),
  resolver: _React2["default"].PropTypes.object.isRequired };

Container.contextTypes = {
  resolver: _React2["default"].PropTypes.object };

Container.displayName = "ResolverContainer";

Container.propTypes = {
  component: _React2["default"].PropTypes.any,
  element: _React2["default"].PropTypes.element,
  resolve: _React2["default"].PropTypes.object,
  resolver: _React2["default"].PropTypes.object };

exports["default"] = Container;
module.exports = exports["default"];