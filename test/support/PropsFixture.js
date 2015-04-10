import React from "react";

class PropsFixture extends React.Component {
  render() {
    return (
      <code dangerouslySetInnerHTML={{
        __html: JSON.stringify(this.props),
      }} />
    );
  }
}

PropsFixture.displayName = "PropsFixture";

export default PropsFixture;
