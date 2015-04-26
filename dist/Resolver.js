"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require("react");

var _React2 = _interopRequireWildcard(_React);

var _Container = require("./Container");

var _Container2 = _interopRequireWildcard(_Container);

var _ResolverError = require("./ResolverError");

var _ResolverError2 = _interopRequireWildcard(_ResolverError);

var Resolver = (function () {
  function Resolver() {
    var states = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Resolver);

    this.frozen = false;
    this.promises = [];
    this.states = states;
  }

  _createClass(Resolver, [{
    key: "await",
    value: function await() {
      var promises = arguments[0] === undefined ? [] : arguments[0];

      this.promises = this.promises.concat(promises);

      return Promise.all(promises);
    }
  }, {
    key: "finish",
    value: function finish() {
      var _this = this;

      var total = this.promises.length;

      return Promise.all(this.promises).then(function (values) {
        if (_this.promises.length > total) {
          return _this.finish();
        }

        return values;
      });
    }
  }, {
    key: "freeze",
    value: function freeze() {
      this.frozen = true;
    }
  }, {
    key: "fulfillState",
    value: function fulfillState(state, callback) {
      state.error = undefined;
      state.fulfilled = true;
      state.rejected = false;

      return callback ? callback(state) : state;
    }
  }, {
    key: "getContainerState",
    value: function getContainerState(container) {
      var id = container.id;

      if (!id) {
        throw new ReferenceError("" + container.constructor.displayName + " should have an ID");
      }

      var state = this.states[id] || {
        fulfilled: false,
        rejected: false,
        values: {} };

      if (!this.states[id]) {
        this.states[id] = state;
      }

      return state;
    }
  }, {
    key: "clearContainerState",
    value: function clearContainerState(container) {
      var id = container.id;

      if (this.states[id]) {
        this.states[id] = undefined;
      }
    }
  }, {
    key: "rejectState",
    value: function rejectState(error, state, callback) {
      state.error = error;
      state.fulfilled = false;
      state.rejected = true;

      if (callback) {
        callback(state);
      }

      throw new Error("" + this.constructor.displayName + " was rejected: " + error);
    }
  }, {
    key: "resolve",
    value: function resolve(container, callback) {
      var _this2 = this;

      var asyncProps = container.props.resolve || {};
      var state = this.getContainerState(container);

      var asyncKeys = Object.keys(asyncProps)
      // Assign existing prop values
      .filter(function (asyncProp) {
        if (container.props.hasOwnProperty(asyncProp)) {
          state.values[asyncProp] = container.props[asyncProp];

          return false;
        }

        return true;
      })
      // Filter out pre-loaded values
      .filter(function (asyncProp) {
        return !state.values.hasOwnProperty(asyncProp);
      });

      if (!asyncKeys.length) {
        return Promise.resolve(this.fulfillState(state, callback));
      }

      if (this.frozen) {
        throw new _ResolverError2["default"](["Resolver is frozen for server rendering.", "" + container.constructor.displayName + " (#" + container.id + ") should have already resolved", "\"" + asyncKeys.join("\", \"") + "\". (http://git.io/vvvkr)"].join(" "));
      }

      var promises = asyncKeys.map(function (prop) {
        var valueOf = container.props.resolve[prop];
        var value = container.props.hasOwnProperty(prop) ? container.props[prop] : valueOf(container.props.props, container.props.context);

        return Promise.resolve(value).then(function (resolved) {
          state.values[prop] = resolved;

          return resolved;
        });
      });

      return this.await(promises).then(function () {
        return _this2.fulfillState(state, callback);
      }, function (error) {
        return _this2.rejectState(error, state, callback);
      });
    }
  }], [{
    key: "createContainer",
    value: function createContainer(Component) {
      var props = arguments[1] === undefined ? {} : arguments[1];

      if (!Component.hasOwnProperty("displayName")) {
        throw new ReferenceError("Resolver.createContainer requires wrapped component to have `displayName`");
      }

      var ComponentContainer = (function (_React$Component) {
        function ComponentContainer() {
          _classCallCheck(this, ComponentContainer);

          if (_React$Component != null) {
            _React$Component.apply(this, arguments);
          }
        }

        _inherits(ComponentContainer, _React$Component);

        _createClass(ComponentContainer, [{
          key: "render",
          value: function render() {
            return _React2["default"].createElement(_Container2["default"], _extends({
              component: Component,
              context: this.context,
              props: this.props
            }, props));
          }
        }]);

        return ComponentContainer;
      })(_React2["default"].Component);

      ComponentContainer.childContextTypes = props.childContextTypes;
      ComponentContainer.contextTypes = props.contextTypes;
      ComponentContainer.displayName = "" + Component.displayName + "Container";

      return ComponentContainer;
    }
  }, {
    key: "render",
    value: function render(element, node) {
      var instance = arguments[2] === undefined ? new Resolver() : arguments[2];

      _React2["default"].render(_React2["default"].createElement(
        _Container2["default"],
        { resolver: instance },
        element
      ), node);

      return instance;
    }
  }, {
    key: "renderToString",
    value: function renderToString(element) {
      var resolver = new Resolver();
      var context = _React2["default"].createElement(
        _Container2["default"],
        { resolver: resolver },
        element
      );

      _React2["default"].renderToString(context);

      return resolver.finish().then(function () {
        resolver.freeze();

        return _React2["default"].renderToString(context);
      });
    }
  }, {
    key: "renderToStaticMarkup",
    value: function renderToStaticMarkup(element) {
      var resolver = new Resolver();
      var context = _React2["default"].createElement(
        _Container2["default"],
        { resolver: resolver },
        element
      );

      _React2["default"].renderToStaticMarkup(context);

      return resolver.finish().then(function () {
        resolver.freeze();

        return _React2["default"].renderToStaticMarkup(context);
      });
    }
  }]);

  return Resolver;
})();

exports["default"] = Resolver;
module.exports = exports["default"];