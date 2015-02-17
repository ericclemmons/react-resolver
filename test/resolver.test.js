var React     = require('react');
var Resolver  = require('..');
var Router    = require('react-router');
var { Route } = Router;


var Page = require('./components/page');

describe('.resolve', function() {
  this.timeout(5000);

  it('does something', function(done) {
    Router.run((
      <Route handler={Page} path="/">
      </Route>
    ), function(Handler) {
      Resolver.resolve(Handler).then(function(resolved) {
        console.log(
          React.renderToStaticMarkup(resolved)
        );
      }).then(done, done);
    });
  });
});
