"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _ = _interopRequire(require("lodash"));

var assign = _interopRequire(require("react/lib/Object.assign"));

var Bluebird = _interopRequire(require("bluebird"));

var React = _interopRequire(require("react"));

var mixin = _interopRequire(require("./mixin"));

var _reactRouter = require("react-router");

var Route = _reactRouter.Route;
var RouteHandler = _reactRouter.RouteHandler;

var Resolver = (function () {
  function Resolver(context) {
    _classCallCheck(this, Resolver);

    this.promises = {};
    this.renders = 0;
    this.context = {};

    if (context) {
      assign(this.context, context, { resolver: this });
    }
  }

  _createClass(Resolver, {
    route: {
      value: function route(routes) {
        var context = { resolver: this };

        var ResolverContext = React.createClass({
          displayName: "ResolverContext",

          childContextTypes: mixin.contextTypes,

          getChildContext: function getChildContext() {
            return context;
          },

          render: function render() {
            return React.createElement(RouteHandler, null);
          }
        });

        return React.createElement(
          Route,
          { handler: ResolverContext },
          routes
        );
      }
    },
    resolve: {
      value: function resolve(element) {
        var _this = this;

        React.renderToStaticMarkup(element);

        var pending = _.any(this.promises, function (promise) {
          return promise.isPending();
        });

        // Because the first render is hidden, a minimum of 1 resolution is required
        if (pending || ! this.renders++) {
          return Bluebird.props(this.promises).then(function () {
            return _this.resolve(element);
          });
        }

        return Bluebird.resolve(element);
      }
    }
  }, {
    create: {
      value: function create(context) {
        return new Resolver(context);
      }
    }
  });

  return Resolver;
})();

module.exports = Resolver;