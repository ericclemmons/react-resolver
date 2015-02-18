var Bluebird  = require('bluebird');
var React     = require('react');
var Router    = require('react-router');
var mixin     = require('./mixin');

var Resolver = function() {
  this.promises = {};
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

  if (pending) {
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
