var React     = require('react');
var Resolver  = require('..');

var Page = require('./components/page');

describe('.resolve', function() {
  this.timeout(5000);

  it('does something', function(done) {
    Resolver.resolve(Page).then(function(resolved) {
      console.log(
        React.renderToStaticMarkup(resolved)
      );
    }).then(done, done);
  });
});
