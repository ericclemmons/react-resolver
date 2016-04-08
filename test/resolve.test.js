import assert from "assert";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { resolve, Resolver } from "..";

@resolve("resolved", ({ actual }) => actual)
class Test extends React.Component {
  static displayName = "Test"

  render() {
    const { expected, resolved } = this.props;

    assert.equal(resolved, expected);

    return (
      <pre>
        {resolved}
      </pre>
    );
  }
}

describe("@resolve", function() {
  it("wraps Component name", function() {
    assert.equal(Test.displayName, "ResolvedResolver");
  });

  context("with a scalar", function() {
    it("resolves", function() {
      return Resolver.resolve(() => <Test actual="scalar" expected="scalar" />);
    });

    it("is synchronous", function() {
      assert.equal(
        renderToStaticMarkup(<Test actual="scalar" expected="scalar" />),
        "<pre>scalar</pre>"
      );
    });
  });

  context("with a Promise ", function() {
    it("resolves", function() {
      return Resolver.resolve(() => <Test actual={Promise.resolve("promise")} expected="promise" />);
    });

    it("is asynchronous", function() {
      assert.equal(
        renderToStaticMarkup(<Test actual={Promise.resolve("promise")} expected="promise" />),
        ""
      );
    });
  });

  context("with a thenable ", function() {
    const thenable = {
      then: (resolve) => resolve("thenable"),
    };

    it("resolves", function() {
      return Resolver.resolve(() => <Test actual={thenable} expected="thenable" />);
    });

    it("is asynchronous", function() {
      assert.equal(
        renderToStaticMarkup(<Test actual={thenable} expected="thenable" />),
        ""
      );
    });
  });
});
