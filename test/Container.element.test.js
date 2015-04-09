import assert from "assert";
import React from "react";
import Resolver from "../src";

import { Container } from "../src/Container";
import ContextFixture from "./support/ContextFixture";
import PropsFixture from "./support/PropsFixture";

describe("<Container />", function() {
  it("should not resolve props that already set", function() {
    const resolve = {
      user: function() {
        throw new Error("`user` should not have been called");
      },
    };

    const element = (
      <Container component={PropsFixture} user="Exists" resolve={resolve} />
    );

    React.renderToStaticMarkup(element);
  });

  it.only("should pass down context", function() {
    const resolver = new Resolver();

    const element = (
      <Container resolver={resolver}>
        <ContextFixture />
      </Container>
    );

    console.log(React.renderToStaticMarkup(element));
  });
});
