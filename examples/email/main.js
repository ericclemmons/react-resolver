var React     = require('react');
var Resolver  = require('../..');
var Router    = require('react-router');

var routes = require('./routes');

// Doesn't work because `React.render*` kills contexts
// Router.run(routes, function(Handler) {
//   Resolver.resolve(Handler).then(function(resolved) {
//     React.render(resolved, document.getElementById('app'));
//   });
// });

// Works
Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
