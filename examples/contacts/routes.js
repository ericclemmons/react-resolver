var App       = require('./handlers/app');
var Home      = require('./handlers/home');
var Contact   = require('./handlers/contact');
var React     = require('react');
var Router    = require('react-router');

var { Route, DefaultRoute } = Router;

module.exports = (
  <Route handler={App} path="/">
    <DefaultRoute name="home" handler={Home} />

    <Route name="contact" path="/contact/:contactId" handler={Contact} />
  </Route>
);
