var _             = require('lodash');
var assign        = require('react/lib/Object.assign');
var Bluebird      = require('bluebird');
var React         = require('react');

module.exports = {
  contextTypes: {
    resolver: React.PropTypes.shape({
      promises: React.PropTypes.object.isRequired
    })
  },

  componentWillMount: function() {
    var id      = this._rootNodeID.replace(/\.\w+/, this.constructor.displayName + '.promise');
    var promise = this.context.resolver.promises[id];
    var statics = this.constructor.resolve;

    if (promise) {
      if (promise.isFulfilled()) {
        assign(this.props, promise.value());

        return true;
      } else {
        throw new Error(id + ' should not be re-rendered until Promise is fulfilled!  (This is a bug in react-resolver)');
      }
    }

    // Disable rendering until component has props loaded
    this.render = function() {
      return false;
    };

    statics.id = id;

    var pending = _.mapValues(statics, function(value, key) {
      // Existing props shouldn't be replaced
      if (_.has(this.props, key)) {
        return Bluebird.resolve(this.props[key]);
      }

      if (_.isFunction(value)) {
        // Call Node-style callback when complete
        if (value.length) {
          return new Bluebird(function(resolve, reject) {
            value.call(this, function(err, result) {
              err ? reject(err) : resolve(result);
            });
          }.bind(this));
        }

        // Value is a synchronous function call
        return Bluebird.resolve(value.call(this));
      }
    }.bind(this));

    this.context.resolver.promises[id] = Bluebird.props(pending);
  }
};
