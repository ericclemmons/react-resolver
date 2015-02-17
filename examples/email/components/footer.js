var React = require('react');

var Footer = React.createClass({
  render() {
    return (
      <footer className="footer">
        <hr />

        <p className="text-center">
          &copy;
          &nbsp;
          <a href="https://github.com/ericclemmons/react-resolver">
            ericclemmons/react-resolver
          </a>
        </p>
      </footer>
    );
  }
});

module.exports = Footer;
