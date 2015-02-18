var React     = require('react');
// var Resolver  = require('../../');
var Router    = require('react-router');

var { RouteHandler } = Router;

var App     = require('./handlers/app');
var Home    = require('./handlers/home');
var Contact = require('./handlers/contact');

var {
  Route,
  DefaultRoute,
} = Router;

var resolver = function(promises) {
  return React.createClass({
    childContextTypes: {
      resolver: React.PropTypes.object
    },

    componentWillMount: function() {
      // var render = this.render.bind(this);

      // this.render = function() {
      //   return false;
      // };
    },

    getChildContext: function() {
      return {
        resolver: {
          promises: promises
        }
      };
    },

    render: function() {
      return <RouteHandler />;
    }
  });
};

module.exports = function(promises) {
  return (
    <Route handler={resolver(promises)}>
      <Route handler={App} path="/">
        <DefaultRoute name="home" handler={Home} />

        <Route name="contact" path="/contact/:contactId" handler={Contact} />
      </Route>
    </Route>
  );
};
