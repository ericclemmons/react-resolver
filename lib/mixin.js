var _             = require('lodash');
var assign        = require('react/lib/Object.assign');
var Bluebird      = require('bluebird');
var React         = require('react');

module.exports = {
  componentWillMount: function() {
    var id      = this.props.resolverId;
    var promise = this.props.promises[id];

    if (id && promise) {
      assign(this.props, promise.value());

      return true;
    }

    var render    = this.render.bind(this);
    var resolves  = _.omit(this.constructor.resolve, function(key) {
      return _.has(this.props);
    }.bind(this));

    this.render = function() {
      return false;
    };

    resolves = _.mapValues(resolves, function(resolve) {
      return Bluebird.resolve(resolve());
    });

    var promise = Bluebird.props(resolves).then(function(resolved) {
      assign(this.props, resolved);

      React.renderToStaticMarkup(render());

      return resolved;
    }.bind(this));

    this.props.promises[id] = promise;
  },

  getDefaultProps: function() {
    return {
      promises: {},
      resolverId: _.uniqueId('resolver_element_type_'),
    }
  }
};
