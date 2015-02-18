require('./app.less');

var Header        = require('../components/header');
var Footer        = require('../components/footer');
var React         = require('react');
var Resolver      = require('../../../');
var RouteHandler  = require('react-router').RouteHandler;

var App = React.createClass({
  // mixins: [Resolver.mixin],

  statics: {
    resolve: {
      loggedIn: function() {
        return true;
      }
    }
  },

  render() {
    return (
      <section>
        <Header />
        <RouteHandler />
        <Footer />
      </section>
    );
  }
});

module.exports = App;
