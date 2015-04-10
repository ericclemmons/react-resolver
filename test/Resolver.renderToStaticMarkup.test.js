import assert from "assert";
import { Resolver } from "../dist";
import React from "react";

import PropsFixture from "./support/PropsFixture";
import PropsFixtureContainer from "./support/PropsFixtureContainer";

describe("Resolver", function() {
  describe(".renderToStaticMarkup", function() {
    context("when given a `React.Component`", function() {
      it("matches React.renderToStaticMarkup", function(done) {
        const expected = React.renderToStaticMarkup(<PropsFixture user="Eric" />);

        Resolver.renderToStaticMarkup(<PropsFixture user="Eric" />)
          .then((markup) => {
            assert.equal(markup, expected);
          }, done)
          .then(done, done)
          .catch(done)
        ;
      });
    });

    context("when given a <Container />", function() {
      it("matches React.renderToStaticMarkup", function(done) {
        const expected = React.renderToStaticMarkup(
          <PropsFixture user="Eric" />
        );

        Resolver.renderToStaticMarkup(<PropsFixtureContainer />)
          .then((markup) => {
            assert.equal(markup, expected);
          })
          .then(done, done)
          .catch(done)
        ;
      });
    });
  });
});
