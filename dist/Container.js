"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react/addons"));

var ResolverError = _interopRequire(require("./ResolverError"));

var Children = React.Children;
var cloneWithProps = React.addons.cloneWithProps;

var Container = (function (_React$Component) {
  function Container(props, context) {
    _classCallCheck(this, Container);

    _get(Object.getPrototypeOf(Container.prototype), "constructor", this).call(this, props, context);

    this.state = this.getResolver().getContainerState(this);
  }

  _inherits(Container, _React$Component);

  _createClass(Container, {
    componentWillMount: {
      value: function componentWillMount() {
        if (!this.state.fulfilled) {
          this.getResolver().resolve(this, this.setState.bind(this));
        }
      }
    },
    getChildContext: {
      value: function getChildContext() {
        var resolver = this.getResolver();

        return { resolver: resolver };
      }
    },
    getResolver: {
      value: function getResolver() {
        var resolver = this.props.resolver || this.context.resolver;

        if (!resolver) {
          throw new ReferenceError("Resolver is not defined in either `context` or `props`.  (Perhaps missing a root <Container resolver={new Resolver()} />?)");
        }

        return resolver;
      }
    },
    shouldComponentUpdate: {
      value: function shouldComponentUpdate(props, state) {
        return state.fulfilled;
      }
    },
    render: {
      value: function render() {
        if (!this.state.fulfilled) {
          return false;
        }

        if (this.props.component) {
          return React.createElement(this.props.component, this.state.values);
        }

        if (this.props.element) {
          return cloneWithProps(this.props.element);
        }

        if (this.props.children) {
          if (Children.count(this.props.children) === 1) {
            return cloneWithProps(Children.only(this.props.children));
          }
          return React.createElement(
            "span",
            null,
            Children.map(this.props.children, cloneWithProps)
          );
        }

        throw new ResolverError("<Container /> requires one of the following props to render: `element`, `component`, or `children`");
      }
    }
  });

  return Container;
})(React.Component);

Container.childContextTypes = {
  resolver: React.PropTypes.any };

Container.contextTypes = {
  id: React.PropTypes.string,
  resolver: React.PropTypes.object };

Container.displayName = "ResolverContainer";

Container.propTypes = {
  component: React.PropTypes.any,
  element: React.PropTypes.element,
  resolve: React.PropTypes.object,
  resolver: React.PropTypes.any };

module.exports = Container;