var React     = require('react');
var Resolver  = require('../..');
var Router    = require('react-router');
var routes    = require('./routes');

var resolver = new Resolver();

Router.run(resolver.route(routes), function(Handler) {
  resolver.handle(Handler).then(function(resolved) {
    React.render(resolved, document.getElementById('app'));
  });
});
