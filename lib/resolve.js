var Bluebird  = require('bluebird');
var React     = require('react');
var Router    = require('react-router');

module.exports = function(Component) {
  // var resolver = {
  //   promises: {},
  // };

  // var Context = React.createClass({
  //   childContextTypes: {
  //     resolver: React.PropTypes.object
  //   },

  //   getChildContext: function() {
  //     return {
  //       resolver: resolver
  //     };
  //   },

  //   render: function() {
  //     return <Component />
  //   }
  // });

  // var element = <Context />;

  var element = <Component />;

  React.renderToStaticMarkup(element);

  console.log(element);

  return Bluebird.props(resolver.promises).then(function() {
    return element;
  });
};
