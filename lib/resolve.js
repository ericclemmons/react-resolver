var Bluebird  = require('bluebird');
var React     = require('react');


module.exports = function(element) {
  React.renderToStaticMarkup(element);

  return Bluebird.props(element.props.promises).then(function() {
    return element;
  });
};
