import assert from "assert";
import React from "react";

import PropsFixture from "./support/PropsFixture";
import PropsFixtureContainer from "./support/PropsFixtureContainer";
import Resolver from "../src";

describe("Resolver", function() {
  describe(".renderToStaticMarkup", function() {
    describe("when given normal components", function() {
      it("matches React.renderToStaticMarkup", function(done) {
        const expected = React.renderToStaticMarkup(<PropsFixture />);

        Resolver.renderToStaticMarkup(<PropsFixture />)
          .then((actual) => assert.equal(actual, expected))
          .then(done)
        ;
      });
    });

    describe.only("when given containers", function() {
      it("matches React.renderToStaticMarkup", function(done) {
        const expected = React.renderToStaticMarkup(
          <PropsFixture user="Eric Clemmons" />
        );

        Resolver.renderToStaticMarkup(<PropsFixtureContainer />)
          .then((actual) => assert.equal(actual, expected))
          .then(done)
          .catch(done)
        ;
      });
    });
  });
});
