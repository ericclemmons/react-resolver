import React from "react";
import { Container } from "../../src";

class ContextFixture extends React.Component {
  render() {
    return <p>{JSON.stringify(this.context)}</p>;
  }
}

ContextFixture.displayName = "ContextFixture";

ContextFixture.contextTypes = Container.contextTypes;

export default ContextFixture;
