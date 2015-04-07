import React from "react";

class Fixture extends React.Component {
  render() {
    return <p>Testing {JSON.stringify(this.props)}</p>;
  }
}

Fixture.displayName = "Fixture";

export default Fixture;
