import assert from "assert";
import React from "react";

import Fixture from "./support/Fixture";
import FixtureContainer from "./support/FixtureContainer";
import Resolver from "../src";

describe("Resolver", function() {
  describe(".renderToStaticMarkup", function() {
    describe("when given normal components", function() {
      it("matches React.renderToStaticMarkup", function(done) {
        const expected = React.renderToStaticMarkup(<Fixture />);

        Resolver.renderToStaticMarkup(<Fixture />)
          .then((actual) => assert.equal(actual, expected))
          .then(done)
        ;
      });
    });

    describe("when given containers", function() {
      it("matches React.renderToStaticMarkup", function(done) {
        const expected = React.renderToStaticMarkup(
          <Fixture user="Eric Clemmons" />
        );

        Resolver.renderToStaticMarkup(<FixtureContainer />)
          .then((actual) => assert.equal(actual, expected))
          .then(done)
          .catch(done)
        ;
      });
    });
  });
});
