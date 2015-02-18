var Bluebird  = require('bluebird');
var React     = require('react');
var Router    = require('react-router');
var mixin     = require('./mixin');

var Resolver = function() {
  this.promises = {};
  this.attempts = 0;
};

Resolver.prototype.route = function(routes) {
  var context = {
    resolver: {
      promises: this.promises
    }
  };

  var ResolverContext = React.createClass({
    childContextTypes: mixin.contextTypes,

    getChildContext: function() {
      return context;
    },

    render: function() {
      return <Router.RouteHandler />;
    }
  });

  return (
    <Router.Route handler={ResolverContext}>
      {routes}
    </Router.Route>
  );
};

Resolver.prototype.resolve = function(element) {
  React.renderToStaticMarkup(element);

  var pending = _.any(this.promises, (promise) => promise.isPending());

  // Because the first render is hidden, a minimum of 1 resolution is required
  if (pending || !this.attempts++) {
    return Bluebird.props(this.promises).then(function() {
      return this.resolve(element);
    }.bind(this));
  }

  return Bluebird.resolve(element);
};

Resolver.prototype.handle = function(Component) {
  return this.resolve(<Component />);
};

module.exports = Resolver;
