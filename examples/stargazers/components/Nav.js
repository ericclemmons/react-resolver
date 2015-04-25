import { Link } from "react-router";
import React from "react";

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="deep-purple darken-2">
        <div className="nav-wrapper">
          <div className="container">
            <Link to="home" className="brand-logo">React Resolver Demo</Link>
            <ul className="right hide-on-small-only">
              <li>
                <iframe src="https://ghbtns.com/github-btn.html?user=ericclemmons&type=follow&count=true" frameBorder="0" scrolling="0" width="150px" height="20px"></iframe>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};
