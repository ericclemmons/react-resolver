/* eslint-disable no-underscore-dangle */

import assign from "object-assign";
import React from "react";

const ID = Symbol("Resolver.ID");
const CHILDREN = Symbol("Resolver.CHILDREN");

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

      results.forEach(({ id, state }) => assign(data, { [id]: state }));

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

    this[ID] = this.generateId();
    this[CHILDREN] = [];

    this.state = assign({
      error: null,
      fulfilled: false,
      props: {},
      rejected: false,
    }, this.lookupState(this));
  }

  componentWillMount() {
    const { fulfilled, rejected } = this.state;
    const { resolver } = this.context;

    if (!fulfilled && !rejected) {
      this.resolve();
    }

    if (resolver && resolver[CHILDREN].indexOf(this) === -1) {
      resolver[CHILDREN].push(this);
    }
  }

  lookupState(resolver) {
    const id = resolver[ID];

    if (this.props.data[id]) {
      return this.props.data[id];
    } else if (this.context.resolver) {
      return this.context.resolver.lookupState(resolver);
    }
  }

  generateId() {
    const { resolver } = this.context;

    if (!resolver) {
      return ".0";
    }

    return `${resolver[ID]}.${resolver[CHILDREN].length}`;
  }

  getChildContext() {
    return { resolver: this };
  }

  onResolve(state) {
    if (this.props.onResolve) {
      this.props.onResolve(state);
    } else if (this.context.resolver) {
      this.context.resolver.onResolve(state);
    }
  }

  render() {
    const { fulfilled, props, rejected } = this.state;
    const { render } = this.props;

    const output = (fulfilled && !rejected) ? render(props, this.context) : null;

    return output;
  }

  resolve() {
    const { props, resolve } = this.props;
    const { context, state } = this;

    const remaining = Object.keys(resolve).filter(name => {
      return !props.hasOwnProperty(name) && !state.hasOwnProperty(name);
    });

    const promises = remaining.map(name => {
      const promise = resolve[name];

      return promise(props, context);
    });

    const promise = Promise.all(promises).then(values => {
      state.error = null;
      state.fulfilled = true;
      state.props = {};
      state.rejected = false;

      remaining.forEach((name, i) => {
        state.props[name] = values[i];
      });

      return state;
    }).catch(error => {
      state.error = error;
      state.fulfilled = false;
      state.rejected = true;

      return state;
    }).then(state => {
      const id = this[ID];

      return { id, state };
    });

    this.onResolve(promise);
  }
}

export default Resolver;
