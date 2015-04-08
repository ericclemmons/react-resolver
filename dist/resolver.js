"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var cuid = _interopRequire(require("cuid"));

var React = _interopRequire(require("react"));

var Container = _interopRequire(require("./Container"));

var Context = _interopRequire(require("./Context"));

var Resolver = (function () {
  function Resolver(element) {
    var states = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Resolver);

    this.promises = [];
    this.root = React.createElement(Context, { element: element, resolver: this });
    this.states = states;

    React.renderToStaticMarkup(this.root);
  }

  _createClass(Resolver, {
    await: {
      value: function await() {
        var promises = arguments[0] === undefined ? [] : arguments[0];

        this.promises = this.promises.concat(promises);

        return Promise.all(promises);
      }
    },
    finish: {
      value: function finish() {
        var _this = this;

        var total = this.promises.length;

        return Promise.all(this.promises).then(function (values) {
          if (_this.promises.length > total) {
            return _this.finish();
          }

          return _this.root;
        });
      }
    },
    getContainerState: {
      value: function getContainerState(container) {
        var id = container.context.id;

        if (!this.states.hasOwnProperty(id)) {
          this.states[id] = {
            fulfilled: false,
            error: undefined,
            rejected: false,
            values: {} };
        }

        return this.states[id];
      }
    },
    resolve: {
      value: function resolve(container, callback) {
        var _this = this;

        var props = container.props;

        var state = this.getContainerState(container);

        var promises = Object.keys(props.resolve).map(function (prop) {
          var valueOf = props.resolve[prop];
          var value = props.hasOwnProperty(prop) ? props[prop] : valueOf(props);

          return Promise.resolve(value).then(function (value) {
            state.values[prop] = value;

            callback(state);

            return value;
          });
        });

        return this.await(promises).then(function () {
          state.error = undefined;
          state.fulfilled = true;
          state.rejected = false;

          callback(state);
        }, function (error) {
          state.error = error;
          state.fulfilled = false;
          state.rejected = true;

          throw new Error("" + _this.constructor.displayName + " was rejected: " + error);
        });
      }
    },
    then: {
      value: function then(callback) {
        return this.finish().then(callback);
      }
    }
  }, {
    createContainer: {
      value: function createContainer(Component) {
        var props = arguments[1] === undefined ? {} : arguments[1];

        if (!Component.hasOwnProperty("displayName")) {
          throw new ReferenceError("Resolver.createContainer requires wrapped component to have `displayName`");
        }

        var id = cuid();

        var ComponentContainer = (function (_React$Component) {
          function ComponentContainer() {
            _classCallCheck(this, ComponentContainer);

            if (_React$Component != null) {
              _React$Component.apply(this, arguments);
            }
          }

          _inherits(ComponentContainer, _React$Component);

          _createClass(ComponentContainer, {
            getChildContext: {
              value: function getChildContext() {
                return { id: id };
              }
            },
            render: {
              value: function render() {
                return React.createElement(Container, _extends({
                  component: Component
                }, props, this.props));
              }
            }
          });

          return ComponentContainer;
        })(React.Component);

        ComponentContainer.childContextTypes = {
          id: React.PropTypes.string.isRequired };

        ComponentContainer.displayName = "" + Component.displayName + "Container";

        return ComponentContainer;
      }
    },
    render: {
      value: function render(element, node) {
        return new Resolver(element).then(function (resolved) {
          return React.render(resolved, node);
        });
      }
    },
    renderToStaticMarkup: {
      value: function renderToStaticMarkup(element) {
        return new Resolver(element).then(function (resolved) {
          return React.renderToStaticMarkup(resolved);
        });
      }
    }
  });

  return Resolver;
})();

module.exports = Resolver;