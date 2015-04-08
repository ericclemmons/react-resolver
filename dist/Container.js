"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var ResolverContainer = (function (_React$Component) {
  function ResolverContainer(props, context) {
    _classCallCheck(this, ResolverContainer);

    _get(Object.getPrototypeOf(ResolverContainer.prototype), "constructor", this).call(this, props, context);

    this.state = this.context.resolver.getContainerState(this);
  }

  _inherits(ResolverContainer, _React$Component);

  _createClass(ResolverContainer, {
    componentWillMount: {
      value: function componentWillMount() {
        if (!this.state.fulfilled) {
          this.context.resolver.resolve(this, this.setState.bind(this));
        }
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

        return React.createElement(this.props.component, this.state.values);
      }
    }
  });

  return ResolverContainer;
})(React.Component);

ResolverContainer.contextTypes = {
  id: React.PropTypes.string.isRequired,
  resolver: React.PropTypes.object.isRequired };

ResolverContainer.displayName = "ResolverContainer";

ResolverContainer.propTypes = {
  component: React.PropTypes.any.isRequired,
  resolve: React.PropTypes.object.isRequired };

module.exports = ResolverContainer;