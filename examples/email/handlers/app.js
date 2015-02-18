require('./app.less');

var Bluebird      = require('bluebird');
var React         = require('react');
var Resolver      = require('../../../');
var RouteHandler  = require('react-router').RouteHandler;
var request       = require('superagent');

var Header  = require('../components/header');
var Footer  = require('../components/footer');

var App = React.createClass({
  statics: {
    resolve: {
      loggedIn: function() {
        return new Promise(function(resolve) {
          setTimeout(resolve, 1000);
        });
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
