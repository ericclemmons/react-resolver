import React from "react";

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="deep-purple darken-2">
        <div className="nav-wrapper">
          <div className="container">
            <a href="https://github.com/ericclemmons/react-resolver" className="brand-logo">React Resolver Demo</a>
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
