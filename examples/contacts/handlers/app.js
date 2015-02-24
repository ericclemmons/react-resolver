var Header        = require('../components/header');
var Footer        = require('../components/footer');
var React         = require('react');
var Resolver      = require('../../../dist');
var RouteHandler  = require('react-router').RouteHandler;

var App = React.createClass({
  mixins: [Resolver.mixin],

  getInitialState: function() {
    return {
      loggedIn: (typeof window === 'undefined') ? true : false
    }
  },

  login: function() {
    this.setState({ loggedIn: true });
  },

  logout: function() {
    this.setState({ loggedIn: false });
  },

  render() {
    return (
      <section>
        <Header />
        {this.state.loggedIn ? <RouteHandler /> : this.renderLogin()}
        <Footer />
      </section>
    );
  },

  renderLogin() {
    return (
      <p className="text-center">
        <a href="javascript:void(0)" onClick={this.login} className="btn btn-success btn-lg">
          Login
        </a>
      </p>
    );
  }
});

module.exports = App;
