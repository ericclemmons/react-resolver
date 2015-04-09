import React from "react";

class PropsFixture extends React.Component {
  render() {
    return <p>{JSON.stringify(this.props)}</p>;
  }
}

PropsFixture.displayName = "PropsFixture";

export default PropsFixture;
