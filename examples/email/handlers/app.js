require('./app.less');

var React         = require('react');
var Resolver      = require('../../../');
var RouteHandler  = require('react-router').RouteHandler;
var request       = require('superagent');

var Header  = require('../components/header');
var Footer  = require('../components/footer');

var App = React.createClass({
  mixins: [Resolver.mixin],

  statics: {
    resolve: {
      contacts: function(done) {
        request.get('/api/contacts.json', done);
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
