var Bluebird  = require('bluebird');
var React     = require('react');
var promises  = require('..').promises;

module.exports = function(Component) {
  var resolver = {
    promises: {},
  };

  var Context = React.createClass({
    childContextTypes: {
      resolver: React.PropTypes.object
    },

    getChildContext: function() {
      return {
        resolver: resolver
      };
    },

    render: function() {
      return <Component />
    }
  });

  React.renderToStaticMarkup(<Context />);

  return Bluebird.props(resolver.promises).then(function() {
    return <Context />;
  });
};
