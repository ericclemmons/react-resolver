var React     = require('react');
var request   = require('superagent');
var Resolver  = require('../');
var Router    = require('react-router');
var routes    = require('../examples/contacts/routes');
var sinon     = require('sinon');

describe('new Resolver()', function() {
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

  describe('.run', function() {
    it('works', function(done) {
      var resolver = new Resolver();

      Router.run(resolver.route(routes), function(Handler) {
        resolver.handle(Handler).then(function(resolved) {
          done(null, React.renderToStaticMarkup(resolved));
        }, done);
      });
    });
  });
});
