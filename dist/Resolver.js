/* eslint-disable no-underscore-dangle */

"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactDomServer = require("react-dom/server");

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

var ID = "ReactResolver.ID";
var CHILDREN = "ReactResolver.CHILDREN";
var HAS_RESOLVED = "ReactResolver.HAS_RESOLVED";
var IS_CLIENT = "ReactResolver.IS_CLIENT";
var PAYLOAD = "__REACT_RESOLVER_PAYLOAD__";

var Resolver = (function (_React$Component) {
  _inherits(Resolver, _React$Component);

  function Resolver(props, context) {
    _classCallCheck(this, Resolver);

    _React$Component.call(this, props, context);

    // Internal tracking variables
    this[ID] = this.generateId();
    this[CHILDREN] = [];
    this[HAS_RESOLVED] = false;
    this[IS_CLIENT] = false;

    this.state = this.computeState(this.props, {
      pending: {},
      resolved: this.cached() || {}
    });

    if (this.isPending(this.state)) {
      this.resolve(this.state);
      this[HAS_RESOLVED] = false;
    } else {
      this[HAS_RESOLVED] = true;
    }
  }

  Resolver.prototype.cached = function cached() {
    var resolver = arguments.length <= 0 || arguments[0] === undefined ? this : arguments[0];

    var id = resolver[ID];

    if (this.props.data.hasOwnProperty(id)) {
      return _extends({}, this.props.data[id]);
    } else if (this.context.resolver) {
      return this.context.resolver.cached(resolver);
    }
  };

  Resolver.prototype.clearData = function clearData() {
    var resolver = arguments.length <= 0 || arguments[0] === undefined ? this : arguments[0];

    var id = resolver[ID];

    if (this.props.data.hasOwnProperty(id)) {
      delete this.props.data[id];
    } else if (this.context.resolver) {
      return this.context.resolver.clearData(resolver);
    }
  };

  Resolver.prototype.componentDidMount = function componentDidMount() {
    this[IS_CLIENT] = true;
  };

  Resolver.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var cleanState = {
      pending: {},
      resolved: {}
    };

    var _computeState = this.computeState(nextProps, cleanState);

    var pending = _computeState.pending;
    var resolved = _computeState.resolved;

    // Next state will resolve async props again, but update existing sync props
    var nextState = {
      pending: pending,
      resolved: _extends({}, this.state.resolved, resolved)
    };

    this.setState(nextState);
  };

  Resolver.prototype.computeState = function computeState(thisProps, nextState) {
    var props = thisProps.props;
    var resolve = thisProps.resolve;

    Object.keys(resolve).forEach(function (name) {
      // Ignore existing supplied props or existing resolved values
      if (!props.hasOwnProperty(name) && !nextState.resolved.hasOwnProperty(name)) {
        var factory = resolve[name];
        var value = factory(props);
        var isPromise = value instanceof Promise || (typeof value === "object" && value !== null || typeof value === "function") && typeof value.then === "function";

        if (isPromise) {
          nextState.pending[name] = value;
        } else {
          // Synchronous values are immediately assigned
          nextState.resolved[name] = value;
        }
      }
    });

    return nextState;
  };

  Resolver.prototype.generateId = function generateId() {
    var resolver = this.context.resolver;

    if (!resolver) {
      return ".0";
    }

    var id = resolver[ID] + "." + resolver[CHILDREN].length;

    if (resolver && resolver[CHILDREN].indexOf(this) === -1) {
      resolver[CHILDREN].push(this);
    }

    return id;
  };

  Resolver.prototype.getChildContext = function getChildContext() {
    return { resolver: this };
  };

  Resolver.prototype.isPending = function isPending() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? this.state : arguments[0];

    return Object.keys(state.pending).length > 0;
  };

  Resolver.prototype.isParentPending = function isParentPending() {
    var resolver = this.context.resolver;

    if (resolver) {
      return resolver.isPending() || resolver.isParentPending();
    }

    return false;
  };

  Resolver.prototype.onResolve = function onResolve(state) {
    if (this.props.onResolve) {
      this.props.onResolve(state);
    } else if (this.context.resolver) {
      this.context.resolver.onResolve(state);
    }
  };

  Resolver.prototype.render = function render() {
    // Avoid rendering until ready
    if (!this[HAS_RESOLVED]) {
      return false;
    }

    // If render is called again (e.g. hot-reloading), re-resolve
    if (this.isPending(this.state)) {
      this.resolve(this.state);
    }

    // Both those props provided by parent & dynamically resolved
    return this.props.children(_extends({}, this.props.props, this.state.resolved));
  };

  Resolver.prototype.resolve = function resolve(state) {
    var _this = this;

    var pending = Object.keys(state.pending).map(function (name) {
      var promise = state.pending[name];

      return { name: name, promise: promise };
    });

    var promises = pending.map(function (_ref) {
      var promise = _ref.promise;
      return promise;
    });

    var resolving = Promise.all(promises).then(function (values) {
      var id = _this[ID];
      var resolved = values.reduce(function (resolved, value, i) {
        var name = pending[i].name;

        resolved[name] = value;

        return resolved;
      }, {});

      return { id: id, resolved: resolved };
    });

    // Resolve listeners get the current ID + resolved
    this.onResolve(resolving);

    // Update current component with new data (on client)
    resolving.then(function (_ref2) {
      var resolved = _ref2.resolved;

      _this[HAS_RESOLVED] = true;

      if (!_this[IS_CLIENT]) {
        return false;
      }

      var nextState = {
        pending: {},
        resolved: _extends({}, state.resolved, resolved)
      };

      _this.setState(nextState);
    });
  };

  Resolver.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    // Prevent updating when parent is changing values
    if (this.isParentPending()) {
      return false;
    }

    // Prevent rendering until pending values are resolved
    if (this.isPending(nextState)) {
      this.resolve(nextState);

      return false;
    }

    // Update if we have resolved successfully
    return this[HAS_RESOLVED];
  };

  return Resolver;
})(_react2["default"].Component);

exports["default"] = Resolver;

Resolver.childContextTypes = {
  resolver: _react2["default"].PropTypes.instanceOf(Resolver)
};

Resolver.contextTypes = {
  resolver: _react2["default"].PropTypes.instanceOf(Resolver)
};

Resolver.defaultProps = {
  data: {},
  props: {},
  resolve: {}
};

Resolver.displayName = "Resolver";

Resolver.propTypes = {
  children: _react2["default"].PropTypes.func.isRequired,
  data: _react2["default"].PropTypes.object.isRequired,
  props: _react2["default"].PropTypes.object,
  resolve: _react2["default"].PropTypes.object
};

Resolver.render = function (render, node) {
  var data = arguments.length <= 2 || arguments[2] === undefined ? window[PAYLOAD] : arguments[2];

  // @TODO - Use react-dom.render
  _reactDom2["default"].render(_react2["default"].createElement(
    Resolver,
    { data: data },
    render
  ), node);

  delete window[PAYLOAD];
};

Resolver.resolve = function (_render) {
  var initialData = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var queue = [];

  // @TODO - Use react-dom/server.renderToStaticMarkup
  _reactDomServer2["default"].renderToStaticMarkup(_react2["default"].createElement(
    Resolver,
    { data: initialData, onResolve: function (promise) {
        return queue.push(promise);
      } },
    _render
  ));

  return Promise.all(queue).then(function (results) {
    var data = _extends({}, initialData);

    results.forEach(function (_ref3) {
      var id = _ref3.id;
      var resolved = _ref3.resolved;
      return data[id] = resolved;
    });

    if (Object.keys(initialData).length < Object.keys(data).length) {
      return Resolver.resolve(_render, data);
    }

    var Resolved = (function (_React$Component2) {
      _inherits(Resolved, _React$Component2);

      function Resolved() {
        _classCallCheck(this, Resolved);

        _React$Component2.apply(this, arguments);
      }

      Resolved.prototype.render = function render() {
        return _react2["default"].createElement(
          Resolver,
          { data: data },
          _render
        );
      };

      return Resolved;
    })(_react2["default"].Component);

    Resolved.displayName = "Resolved";

    return { data: data, Resolved: Resolved };
  });
};
module.exports = exports["default"];