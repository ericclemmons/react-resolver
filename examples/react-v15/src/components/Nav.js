import { Link } from "react-router";
import React from "react";

export default class Nav extends React.Component {
  static displayName = "Nav"

  render() {
    return (
      <nav className="deep-purple darken-2">
        <div className="nav-wrapper">
          <div className="container">
            <Link to="/" className="brand-logo">React Resolver Demo</Link>
          </div>
        </div>
      </nav>
    );
  }
}
