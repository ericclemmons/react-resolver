import React from 'react';
import request from 'superagent';
import Resolver from '../dist'
import Router from 'react-router';
import sinon from 'sinon';
import Routes from '../examples/contacts/routes';

let resolver = Resolver.create();

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
    Router.run(resolver.route(Routes), function(Handler) {
      resolver.handle(Handler).then(function(resolved) {
        done(null, React.renderToStaticMarkup(resolved));
      }, done);
    });
  });
});
