import _ from 'lodash';
import assign from 'react/lib/Object.assign';
import Bluebird from 'bluebird';
import React from 'react';
import utils from './utils';

export default {
  contextTypes: {
    resolver: React.PropTypes.shape({
      promises: React.PropTypes.object.isRequired
    })
  },

  componentWillMount: function() {
    let id      = utils.getElementId(this);
    let promise = utils.getElementPromise(this);
    let statics = utils.getElementStatics(this);

    if (!statics) {
      return false;
    }

    if (promise) {
      if (promise.isFulfilled()) {
        assign(this.props, promise.value());

        return true;
      } else {
        throw new Error(id + ' should not be re-rendered until Promise is fulfilled!  (This is a bug in react-resolver)');
      }
    }

    this.renderResolved = this.render.bind(this);

    // Disable rendering until component has props loaded
    this.render = function() {
      return false;
    };

    let pending = _.mapValues(statics, (value, key) => {
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
    });

    this.context.resolver.promises[id] = Bluebird.props(pending);
  },

  componentDidMount: function() {
    let promise = utils.getElementPromise(this);

    if (!promise) {
      return false;
    }

    if (promise.isPending()) {
      return promise.then(this.componentDidMount.bind(this));
    }

    utils.removeElementPromise(this);

    assign(this.props, promise.value());

    this.render = this.renderResolved;
    this.forceUpdate();
  },
};
