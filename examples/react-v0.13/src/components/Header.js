import React from "react";

import Nav from "./Nav";

export default class Header extends React.Component {
  displayName = "Header"

  render() {
    return (
      <header>
        <Nav />
      </header>
    );
  }
}
