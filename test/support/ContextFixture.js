import React from "react";
import { Container } from "../../src";

class ContextFixture extends React.Component {
  render() {
    const keys = Object.keys(this.context).filter((key) => this.context[key]);

    return <code>[{keys.join(", ")}]</code>;
  }
}

ContextFixture.displayName = "ContextFixture";

ContextFixture.contextTypes = Container.contextTypes;

export default ContextFixture;
