import React from "react";

export default class Footer extends React.Component {
  displayName = "Footer"

  render() {
    return (
      <footer className="page-footer orange">
        <div className="footer-copyright center-align">
          &copy; 2015 Eric Clemmons
        </div>
      </footer>
    );
  }
}
