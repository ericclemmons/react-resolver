var React     = require('react');
var Resolver  = require('..');

var Page = require('./components/page');

describe('.resolve', function() {
  it('does something', function(done) {
    Resolver.resolve(<Page />).then(function(resolved) {
      console.log(
        React.renderToStaticMarkup(resolved)
      );
    }).then(done, done);
  });
});
