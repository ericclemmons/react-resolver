import React from "react";

import Nav from "./Nav";

export default class Header extends React.Component {
  static displayName = "Header"

  render() {
    return (
      <header>
        <Nav />
      </header>
    );
  }
}
