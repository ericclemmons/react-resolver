var React = require('react');
var Link  = require('react-router').Link;

var Header = React.createClass({
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link to="home" className="navbar-brand">
              React Resolver
            </Link>
          </div>

          {this.props.children}
        </div>
      </nav>
    );
  }
});

module.exports = Header;
