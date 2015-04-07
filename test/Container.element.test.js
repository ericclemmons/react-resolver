import assert from "assert";
import React from "react";

import { Container } from "../src";

class PropsFixture extends React.Component {
  render() {
    return <p>{Object.keys(this.props).join(", ")}</p>;
  }
}

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
});
