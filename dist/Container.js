"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLibCloneWithProps = require("react/lib/cloneWithProps");

var _reactLibCloneWithProps2 = _interopRequireDefault(_reactLibCloneWithProps);

var _ResolverError = require("./ResolverError");

var _ResolverError2 = _interopRequireDefault(_ResolverError);

var Children = _react2["default"].Children;

var Container = (function (_React$Component) {
  _inherits(Container, _React$Component);

  function Container(props, context) {
    _classCallCheck(this, Container);

    _get(Object.getPrototypeOf(Container.prototype), "constructor", this).call(this, props, context);

    this.children = [];

    this.id = this.getId();
    this.state = this.getResolver().getContainerState(this);
  }

  _createClass(Container, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.resolve();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.getResolver().clearContainerState(this);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.getResolver().clearContainerState(this);

      this.resolve();
    }
  }, {
    key: "getId",
    value: function getId() {
      var parent = this.context.parent;

      if (!parent) {
        return ".0";
      }

      var id = parent.id + "." + parent.children.length;

      parent.children.push(this);

      return id;
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      var parent = this;
      var resolver = this.getResolver();

      return {
        parent: parent,
        resolver: resolver
      };
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

      var _props = this.props;
      var
      // expected properties
      component = _props.component;
      var element = _props.element;
      var resolve = _props.resolve;
      var resolver = _props.resolver;
      var context = _props.context;
      var props = _props.props;
      var children = _props.children;

      var passThrough = _objectWithoutProperties(_props, ["component", "element", "resolve", "resolver", "context", "props", "children"]);

      if (component) {
        return _react2["default"].createElement(this.props.component, _extends({}, passThrough, this.state.values));
      }

      if (element) {
        return (0, _reactLibCloneWithProps2["default"])(element, passThrough);
      }

      if (this.props.children) {
        if (Children.count(children) === 1) {
          return (0, _reactLibCloneWithProps2["default"])(Children.only(children), passThrough);
        }

        return _react2["default"].createElement(
          "span",
          null,
          Children.map(this.props.children, function (child) {
            return (0, _reactLibCloneWithProps2["default"])(child, passThrough);
          })
        );
      }

      throw new _ResolverError2["default"]("<Container /> requires one of the following props to render: `element`, `component`, or `children`");
    }
  }, {
    key: "resolve",
    value: function resolve() {
      var _this = this;

      var nextState = this.getResolver().getContainerState(this);

      this.setState(nextState);

      if (!nextState.fulfilled) {
        this.getResolver().resolve(this, function (finalState) {
          return new Promise(function (resolve) {
            _this.setState(finalState, resolve);
          });
        });
      }
    }
  }]);

  return Container;
})(_react2["default"].Component);

Container.childContextTypes = {
  parent: _react2["default"].PropTypes.instanceOf(Container),
  resolver: _react2["default"].PropTypes.object.isRequired
};

Container.contextTypes = {
  parent: _react2["default"].PropTypes.instanceOf(Container),
  resolver: _react2["default"].PropTypes.object
};

Container.displayName = "ResolverContainer";

Container.propTypes = {
  component: _react2["default"].PropTypes.any,
  element: _react2["default"].PropTypes.element,
  resolve: _react2["default"].PropTypes.object,
  resolver: _react2["default"].PropTypes.object
};

exports["default"] = Container;
module.exports = exports["default"];

// everything we want to seemlessly pass through