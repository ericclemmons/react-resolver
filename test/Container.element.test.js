import assert from "assert";
import { Container, Resolver } from "../dist";
import React from "react";

import ContextFixture from "./support/ContextFixture";
import PropsFixture from "./support/PropsFixture";
import PropsFixtureContainer from "./support/PropsFixtureContainer";

describe("<Container />", function() {
  beforeEach(function() {
    this.resolver = new Resolver();
  });

  describe(".props", function() {
    describe(".children", function() {
      it("should pass `parent` & `resolver` to child context", function() {
        const actual = React.renderToStaticMarkup(
          <Container resolver={this.resolver}><ContextFixture /></Container>
        );

        assert.equal(actual, "<code>[parent, resolver]</code>");
      });
    });

    describe(".component", function() {
      it("should pass `parent` & `resolver` to child context", function() {
        const actual = React.renderToStaticMarkup(
          <Container component={ContextFixture} resolver={this.resolver} />
        );

        assert.equal(actual, "<code>[parent, resolver]</code>");
      });
    });

    describe(".element", function() {
      it("should pass `parent` & `resolver` to child context", function() {
        const actual = React.renderToStaticMarkup(
          <Container element={<ContextFixture />} resolver={this.resolver} />
        );

        assert.equal(actual, "<code>[parent, resolver]</code>");
      });
    });

    describe(".resolve", function() {
      it("should resolve keys", function(done) {
        const element = (
          <Container component={PropsFixture} resolve={{
            user: () => {
              return new Promise((resolve) => {
                setTimeout(() => resolve("Eric"), 0);
              });
            },
          }} />
        );

        const expected = React.renderToStaticMarkup(
          <PropsFixture user="Eric" />
        );

        Resolver.renderToStaticMarkup(element).then((markup) => {
          assert.equal(markup, expected);
          done();
        }).catch(done);
      });

      context("when keys are already defined in props", function() {
        before(function() {
          this.props = { user: "Exists" };
        });

        it("should not resolve keys", function() {
          React.renderToStaticMarkup(
            <Container
              component={PropsFixture}
              resolve={{
                user: function() { throw new Error("`user` should not have been called"); },
              }}
              resolver={this.resolver}
              {...this.props}
            />
          );
        });

        it("should render immediately", function() {
          const actual = React.renderToStaticMarkup(
            <Container
              component={PropsFixture}
              resolve={{
                user: function() { return "Waiting..."; },
              }}
              resolver={this.resolver}
              {...this.props}
            />
          );

          assert.equal(actual, `<code>${JSON.stringify(this.props)}</code>`);
        });
      });
    });

    describe(".resolver", function() {
      it("should store state for plain <Container />s", function() {
        React.renderToStaticMarkup(
          <Container resolver={this.resolver}>
            <PropsFixture />
          </Container>
        );

        const ids = Object.keys(this.resolver.states);

        assert.equal(1, ids.length);
        assert.deepEqual([".0"], ids);
      });

      it("should store state for `Resolver.createContainer`s", function() {
        React.renderToStaticMarkup(
          <Container resolver={this.resolver}>
            <PropsFixtureContainer />
          </Container>
        );

        const ids = Object.keys(this.resolver.states);

        assert.equal(2, ids.length);
        assert.deepEqual([".0", ".0.0"], ids);
      });
    });
  });
});
