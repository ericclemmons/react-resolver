"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _ = _interopRequire(require("lodash"));

var assign = _interopRequire(require("react/lib/Object.assign"));

var Bluebird = _interopRequire(require("bluebird"));

var React = _interopRequire(require("react"));

var utils = _interopRequire(require("./utils"));

module.exports = {
  contextTypes: {
    resolver: React.PropTypes.shape({
      promises: React.PropTypes.object.isRequired
    })
  },

  componentWillMount: function componentWillMount() {
    var _this = this;

    var id = utils.getElementId(this);
    var promise = utils.getElementPromise(this);
    var statics = utils.getElementStatics(this);

    if (!statics) {
      return false;
    }

    if (promise) {
      if (promise.isFulfilled()) {
        assign(this.props, promise.value());

        return true;
      } else {
        throw new Error(id + " should not be re-rendered until Promise is fulfilled!  (This is a bug in react-resolver)");
      }
    }

    this.renderResolved = this.render.bind(this);

    // Disable rendering until component has props loaded
    this.render = function () {
      return false;
    };

    var pending = _.mapValues(statics, function (value, key) {
      // Existing props shouldn't be replaced
      if (_.has(_this.props, key)) {
        return Bluebird.resolve(_this.props[key]);
      }

      if (_.isFunction(value)) {
        // Call Node-style callback when complete
        if (value.length) {
          return new Bluebird((function (resolve, reject) {
            value.call(this, function (err, result) {
              err ? reject(err) : resolve(result);
            });
          }).bind(_this));
        }

        // Value is a synchronous function call
        return Bluebird.resolve(value.call(_this));
      }
    });

    this.context.resolver.promises[id] = Bluebird.props(pending);
  },

  componentDidMount: function componentDidMount() {
    var promise = utils.getElementPromise(this);

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
  } };