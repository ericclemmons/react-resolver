var _             = require('lodash');
var assign        = require('react/lib/Object.assign');
var Bluebird      = require('bluebird');
var React         = require('react');

module.exports = {
  contextTypes: {
    resolver: React.PropTypes.object.isRequired
  },

  componentWillMount: function() {
    if (!this.context) {
      return false;
    }

    if (!this.context.resolver) {
      return false;
    }

    // Shortcuts
    var resolve   = this.constructor.resolve;
    var resolver  = this.context.resolver;

    // Requirements for each lazy-load
    var id      = this._rootNodeID.replace(/\.\w+/, this.constructor.displayName + '.resolver');
    var promise = resolver.promises[id];

    if (promise) {
      if (promise.isFulfilled()) {
        assign(this.props, promise.value());
      } else {
        throw new Error(id + ' should not be re-rendered until Promise is fulfilled!  (This is a bug in react-resolver)');
      }

      return false;
    }

    resolve.id = id;

    var render = this.render.bind(this);

    this.render = function() {
      return false;
    };

    var pending = _.omit(resolve, function(value, key) {
      return _.has(this.props, key);
    }.bind(this));

    var values = Bluebird.props(_.mapValues(pending, function(value, key) {
      if (_.isFunction(value)) {
        return new Bluebird(function(resolve, reject) {
          if (value.length) {
            value.call(this, function(err, result) {
              err ? reject(err) : resolve(result);
            });
          } else {
            resolve(value.call(this))
          }
        }.bind(this));
      }

      return Bluebird.resolve(value);
    }.bind(this)));

    resolver.promises[id] = Bluebird.props(values).then(function(resolved) {
    //   var childResolver = {
    //     promises: {},
    //   };

    //   var Context = React.createClass({
    //     childContextTypes: {
    //       resolver: React.PropTypes.object
    //     },

    //     getChildContext: function() {
    //       return {
    //         resolver: childResolver
    //       };
    //     },

    //     render: render
    //   });

    return resolved;

    //   React.renderToStaticMarkup(<Context />);
    //
    //   return Bluebird.props(childResolver.promises).then(function() {
    //     assign(resolver.promises, childResolver.promises);
    //   });
    }.bind(this));
  }
};
