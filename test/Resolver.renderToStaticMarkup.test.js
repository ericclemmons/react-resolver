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
            assert.equal(markup.html, expected);
          }, done)
          .then(done)
          .catch(done)
        ;
      });
    });

    context("when given a <Container />", function() {
      it("matches React.renderToStaticMarkup", function(done) {
        const expected = React.renderToStaticMarkup(
          <PropsFixture user="Eric" />
        );

        const render = function() {
          return Resolver.renderToStaticMarkup(<PropsFixtureContainer />);
        };

        render()
          .then((markup) => {
            assert.equal(markup.html, expected);

            return render();
          })
          .then((markup) => {
            assert.equal(markup.html, expected);
          })
          .then(done)
          .catch(done)
        ;
      });
    });
  });
});
