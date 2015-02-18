var Bluebird  = require('bluebird');
var React     = require('react');
var Resolver  = require('../..');
var Router    = require('react-router');

var routes = require('./routes');

// Doesn't work because `React.render*` kills contexts
var promises = {};

var resolve = function(element) {
  React.renderToStaticMarkup(element);

  var pending = _.any(promises, (promise) => promise.isPending());

  if (pending) {
    return Bluebird.props(promises).then(function() {
      return resolve(element);
    });
  }

  return Bluebird.resolve(element);
};

Router.run(routes(promises), function(Handler) {
  var element = <Handler />;

  resolve(element).then(function() {
    React.render(element, document.getElementById('app'));
  });
});
