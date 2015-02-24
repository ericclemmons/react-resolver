var _         = require('lodash');
var assign    = require('react/lib/Object.assign');
var Bluebird  = require('bluebird');
var React     = require('react');
var Router    = require('react-router');
var mixin     = require('./mixin');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Resolver = function(context) {
  this.promises = {};
  this.renders = 0;
  this.context  = {};

  if (context) {
    assign(this.context, context, { resolver: this });
  }
};

Resolver.prototype.route = function(routes) {
  var context = { resolver: this };

  var ResolverContext = React.createClass({
    childContextTypes: mixin.contextTypes,

    getChildContext: function() {
      return context;
    },

    render: function() {
      return React.createElement(RouteHandler);
    }
  });

  return React.createElement(Route, {handler: ResolverContext}, routes);
};

Resolver.prototype.resolve = function(element) {
  React.renderToStaticMarkup(element);

  var pending = _.any(this.promises, function (promise) {
    return promise.isPending();
  });

  // Because the first render is hidden, a minimum of 1 resolution is required
  if (pending || !this.renders++) {
    return Bluebird.props(this.promises).then(function() {
      return this.resolve(element);
    }.bind(this));
  }

  return Bluebird.resolve(element);
};

Resolver.prototype.handle = function(Component) {
  return this.resolve(React.createElement(Component));
};

module.exports = Resolver;
