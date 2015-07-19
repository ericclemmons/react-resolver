/* eslint-disable no-underscore-dangle */

import assign from "object-assign";
import React from "react";

const ID = Symbol("ReactResolver.ID");
const CHILDREN = Symbol("ReactResolver.CHILDREN");
const HAS_RESOLVED = Symbol("ReactResolver.HAS_RESOLVED");
const IS_CLIENT = Symbol("ReactResolver.IS_CLIENT");

export default class Resolver extends React.Component {
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
    component: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
    props: React.PropTypes.object,
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

      results.forEach(({ id, resolved }) => data[id] = resolved);

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
    this[HAS_RESOLVED] = false;
    this[IS_CLIENT] = false;

    this.state = this.computeState(this.props, {
      pending: {},
      resolved: this.cached() || {},
    });

    if (this.isPending(this.state)) {
      this.resolve(this.state);
      this[HAS_RESOLVED] = false;
    } else {
      this[HAS_RESOLVED] = true;
    }
  }

  cached(resolver = this) {
    const id = resolver[ID];

    if (this.props.data.hasOwnProperty(id)) {
      return assign({}, this.props.data[id]);
    } else if (this.context.resolver) {
      return this.context.resolver.cached(resolver);
    }
  }

  clearData(resolver = this) {
    const id = resolver[ID];

    if (this.props.data.hasOwnProperty(id)) {
      delete this.props.data[id];
    } else if (this.context.resolver) {
      return this.context.resolver.clearData(resolver);
    }
  }

  componentDidMount() {
    this[IS_CLIENT] = true;

  }

  componentWillReceiveProps(nextProps) {
    const cleanState = {
      pending: {},
      resolved: {},
    };

    const { pending, resolved } = this.computeState(nextProps, cleanState);

    // Next state will resolve async props again, but update existing sync props
    const nextState = {
      pending,
      resolved: { ...this.state.resolved, ...resolved },
    };

    this.setState(nextState);
  }

  computeState(thisProps, nextState) {
    const { context, props, resolve } = thisProps;

    Object.keys(resolve).forEach(name => {
      // Ignore existing supplied props or existing resolved values
      if (!props.hasOwnProperty(name) && !nextState.resolved.hasOwnProperty(name)) {
        const factory = resolve[name];
        const value = factory(props, context);

        if (value instanceof Promise) {
          nextState.pending[name] = value;
        } else {
          // Synchronous values are immediately assigned
          nextState.resolved[name] = value;
        }
      }
    });

    return nextState;
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

  isPending(state = this.state) {
    return Object.keys(state.pending).length > 0;
  }

  isParentPending() {
    const { resolver } = this.context;

    if (resolver) {
      return resolver.isPending() || resolver.isParentPending();
    }

    return false;
  }

  onResolve(state) {
    if (this.props.onResolve) {
      this.props.onResolve(state);
    } else if (this.context.resolver) {
      this.context.resolver.onResolve(state);
    }
  }

  render() {
    // Avoid rendering until ready
    if (!this[HAS_RESOLVED]) {
      return false;
    }

    return (
      <this.props.component
        {...this.props.props}
        {...this.state.resolved}
      />
    );
  }

  resolve(state) {
    const pending = Object.keys(state.pending).map(name => {
      const promise = state.pending[name];

      return { name, promise };
    });

    const promises = pending.map(({ promise }) => promise);

    const resolving = Promise.all(promises).then(values => {
      const id = this[ID];
      const resolved = values.reduce((resolved, value, i) => {
        const { name } = pending[i];

        resolved[name] = value;

        return resolved;
      }, {});

      return { id, resolved };
    });

    // Resolve listeners get the current ID + resolved
    this.onResolve(resolving);

    // Update current component with new data (on client)
    resolving.then(({ resolved }) => {
      this[HAS_RESOLVED] = true;

      if (!this[IS_CLIENT]) {
        return false;
      }

      const nextState = {
        pending: {},
        resolved: { ...state.resolved, ...resolved },
      };

      this.setState(nextState);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Prevent rendering until pending values are resolved
    if (this.isPending(nextState)) {
      this.resolve(nextState);

      return false;
    }

    // Prevent updating when parent is changing values
    if (this.isParentPending()) {
      return false;
    }

    // Update if we have resolved successfully
    return this[HAS_RESOLVED];
  }
}
