import React from "react";

class Fixture extends React.Component {
  render() {
    return <p {...this.props}>Fixture</p>;
  }
}

Fixture.displayName = "Fixture";

export default Fixture;
