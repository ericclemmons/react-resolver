import assert from "assert";
import React from "react";
import Resolver from "../src";

import Container from "../src/Container";
import ContextFixture from "./support/ContextFixture";
import PropsFixture from "./support/PropsFixture";

describe.only("<Container />", function() {
  before(function() {
    this.resolver = new Resolver();
  });

  describe(".props", function() {
    describe(".children", function() {
      it("should pass `resolver` to child context", function() {
        const actual = React.renderToStaticMarkup(
          <Container resolver={this.resolver}><ContextFixture /></Container>
        );

        assert.equal(actual, "<code>[resolver]</code>");
      });
    });

    describe(".component", function() {
      it("should pass `resolver` to child context", function() {
        const actual = React.renderToStaticMarkup(
          <Container component={ContextFixture} resolver={this.resolver} />
        );

        assert.equal(actual, "<code>[resolver]</code>");
      });
    });

    describe(".element", function() {
      it("should pass `resolver` to child context", function() {
        const actual = React.renderToStaticMarkup(
          <Container element={<ContextFixture />} resolver={this.resolver} />
        );

        assert.equal(actual, "<code>[resolver]</code>");
      });
    });

    describe(".resolve", function() {
      before(function() {
        this.props = { user: "Exists" };
      });

      describe("given keys already defined in props", function() {
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

    });
  });
});
