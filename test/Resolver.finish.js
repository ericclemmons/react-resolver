import React from "react";
import { Resolver } from "../dist";

class Foo extends React.Component {
  render() {
    console.log("render Foo");
    return (
      <h1>Foo</h1>
    );
  }
}

Foo.displayName = "Foo";

const FooContainer = Resolver.createContainer(Foo, {
  resolve: {
    foo: function() {
      console.log("foo resolve");
      return "foo";
    }
  }
});

class Bar extends React.Component {
  render() {
    console.log("render Bar");
    return (
      <FooContainer />
    );
  }
}

Bar.displayName = "Bar";

const BarContainer = Resolver.createContainer(Bar, {
  resolve: {
    bar: function() {
      console.log("bar resolve");
      return "bar";
    }
  }
});

describe("Resolver", function() {
  describe(".finish", function() {
    it("should finish", function(done) {
      Resolver.renderToString(<BarContainer />).then(markup => {
        console.log(markup);
      }).then(done).catch(done);
    });
  });
});
