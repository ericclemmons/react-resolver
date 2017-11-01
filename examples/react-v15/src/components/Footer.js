import React from "react";

export default class Footer extends React.Component {
  static displayName = "Footer"

  render() {
    return (
      <footer className="page-footer orange">
        <div className="footer-copyright center-align">
          &copy; 2016 Eric Clemmons
        </div>
      </footer>
    );
  }
}
