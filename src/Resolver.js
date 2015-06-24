/* eslint-disable no-underscore-dangle */

import assign from "object-assign";
import React from "react";

const ID = Symbol("ReactResolver.ID");
const CHILDREN = Symbol("ReactResolver.CHILDREN");
const IS_CLIENT = Symbol("ReactResolver.IS_CLIENT");

class Resolver extends React.Component {
  static childContextTypes = {
    resolver: React.PropTypes.instanceOf(Resolver),
  }

  static contextTypes = {
    resolver: React.PropTypes.instanceOf(Resolver),
  }

  static defaultProps = {
    data: {},
    props: {},
    resolve: {},
  }

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    props: React.PropTypes.object,
    render: React.PropTypes.func.isRequired,
    resolve: React.PropTypes.object,
  }

  static render = function(render, node) {
    const initialData = window.__REACT_RESOLVER_PAYLOAD__;

    // Server-rendered output, but missing payload
    if (!initialData && node.innerHTML) {
      return Resolver.resolve(render).then(({ Resolved }) => {
        React.render(<Resolved />, node);
      });
    }

    React.render(<Resolver data={initialData} render={render} />, node);

    delete window.__REACT_RESOLVER_PAYLOAD__;
  }

  static resolve = function(render, initialData = {}) {
    const queue = [];

    React.renderToStaticMarkup(
      <Resolver
        data={initialData}
        onResolve={(promise) => queue.push(promise)}
        render={render}
      />
    );

    return Promise.all(queue).then((results) => {
      const data = assign({}, initialData);

      results.forEach(({ id, state }) => data[id] = state);

      if (Object.keys(initialData).length < Object.keys(data).length) {
        return Resolver.resolve(render, data);
      }

      class Resolved extends React.Component {
        displayName = "Resolved"

        render() {
          return (
            <Resolver data={data} render={render} />
          );
        }
      }

      return { data, Resolved };
    });
  }

  displayName = "Resolver"

  constructor(props, context) {
    super(props, context);

    // Internal tracking variables
    this[ID] = this.generateId();
    this[CHILDREN] = [];
    this[IS_CLIENT] = false;

    // Default state & begin resolution
    this.state = this.resolve();
  }

  clearData(resolver = this) {
    const id = resolver[ID];

    if (this.props.data[id]) {
      this.props.data[id] = undefined;
    } else if (this.context.resolver) {
      return this.context.resolver.clearData(resolver);
    }
  }

  componentDidMount() {
    this[IS_CLIENT] = true;
  }

  componentWillUnmount() {
    this.clearData();
  }

  componentWillReceiveProps() {
    this.clearData();
    this.resolve();
  }

  lookupState(resolver) {
    const id = resolver[ID];

    if (this.props.data[id]) {
      return assign({}, this.props.data[id]);
    } else if (this.context.resolver) {
      return this.context.resolver.lookupState(resolver);
    }
  }

  generateId() {
    const { resolver } = this.context;

    if (!resolver) {
      return ".0";
    }

    const id = `${resolver[ID]}.${resolver[CHILDREN].length}`;

    if (resolver && resolver[CHILDREN].indexOf(this) === -1) {
      resolver[CHILDREN].push(this);
    }

    return id;
  }

  getChildContext() {
    return { resolver: this };
  }

  getRemaining(state) {
    const { resolve } = this.props;

    // Remaining properties are any specified `resolve`
    // keys that aren't stored in `state.props` yet
    const remaining = Object.keys(resolve).filter(name => {
      return !state.props.hasOwnProperty(name);
    }).map(name => {
      const factory = resolve[name];

      return { name, factory };
    });

    return remaining;
  }

  isReady() {
    const remaining = this.getRemaining(this.state);

    return !remaining.length;
  }

  onResolve(state) {
    if (this.props.onResolve) {
      this.props.onResolve(state);
    } else if (this.context.resolver) {
      this.context.resolver.onResolve(state);
    }
  }

  render() {
    const { render } = this.props;
    const { context, state } = this;

    const output = this.isReady() ? render(state.props, context) : null;

    return output;
  }

  resolve() {
    const { props, resolve } = this.props;
    const { context } = this;

    // Lookup existing state, if exists
    const state = this.lookupState(this) || { props: {} };

    // Give preference to prop values
    Object.keys(props).forEach(name => {
      const value = props[name];

      if (value !== undefined) {
        state.props[name] = value;
      }
    });

    // Based on state, determine which values are missing
    const async = this.getRemaining(state).map(({ name, factory }) => {
      // Factory methods get supplied props & supplied context
      const value = factory(props, context);

      return { name, value };
    }).filter(({ name, value }) => {
      if (value instanceof Promise) {
        return true;
      }

      // Synchronous values are immediately assigned
      state.props[name] = value;
    });

    if (!async.length) {
      return state;
    }

    // Resolve async values
    const promise = Promise
      .all(async.map(({ value }) => value))
      .then(values => {
        async.forEach(({ name }, i) => {
          state.props[name] = values[i];
        });

        return state;
      })
      .then(state => {
        if (this[IS_CLIENT]) {
          this.setState(state);
        }

        return state;
      })
      .then(state => {
        const id = this[ID];

        return { id, state };
      })
    ;

    this.onResolve(promise);

    return state;
  }
}

export default Resolver;
