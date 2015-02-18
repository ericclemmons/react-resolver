var React     = require('react');
var request   = require('superagent');
var resolver  = require('../').create();
var Router    = require('react-router');
var routes    = resolver.route(require('../examples/contacts/routes'));
var sinon     = require('sinon');

describe('Resolver', function() {
  before(function() {
    sinon.stub(request, 'get', function(url, callback) {
      var file = `../public${url}`;

      callback({
        ok: true,
        body: require(file)
      });
    });
  });

  after(function() {
    request.get.restore();
  });

  it('works', function(done) {
    Router.run(routes, function(Handler) {
      resolver.handle(Handler).then(function(resolved) {
        done(null, React.renderToStaticMarkup(resolved));
      }, done);
    });
  });
});
