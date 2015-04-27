import React from "react";

import Container from "./Container";
import ResolverError from "./ResolverError";

export default class Resolver {
  constructor(states = {}) {
    this.frozen = false;
    this.promises = [];
    this.states = states;
  }

  await(promises = []) {
    this.promises = this.promises.concat(promises);

    return Promise.all(promises);
  }

  finish() {
    const total = this.promises.length;

    return Promise.all(this.promises).then((values) => {
      if (this.promises.length > total) {
        return this.finish();
      }

      return values;
    });
  }

  freeze() {
    this.frozen = true;
  }

  fulfillState(state, callback) {
    state.error = undefined;
    state.fulfilled = true;
    state.rejected = false;

    return callback ? callback(state) : state;
  }

  getContainerState(container) {
    const { id } = container;

    if (!id) {
      throw new ReferenceError(`${container.constructor.displayName} should have an ID`);
    }

    const state = this.states[id] || this.rehydrate(id) || {
      fulfilled: false,
      rejected: false,
      values: {},
    };

    if (!this.states[id]) {
      this.states[id] = state;
    }

    return state;
  }

  clearContainerState(container) {
    const { id } = container;

    Object.keys(this.states)
      .filter(key => key.indexOf(id) === 0)
      .forEach(key => this.states[key] = undefined)
    ;
  }

  rejectState(error, state, callback) {
    state.error = error;
    state.fulfilled = false;
    state.rejected = true;

    if (callback) {
      callback(state);
    }

    throw new Error(`${this.constructor.displayName} was rejected: ${error}`);
  }

  rehydrate(id) {
    if (typeof __resolver__ === "undefined") {
      return null;
    }
    return __resolver__[id];
  }

  resolve(container, callback) {
    const asyncProps = container.props.resolve || {};
    const state = this.getContainerState(container);

    const asyncKeys = Object.keys(asyncProps)
      // Assign existing prop values
      .filter((asyncProp) => {
        if (container.props.hasOwnProperty(asyncProp)) {
          state.values[asyncProp] = container.props[asyncProp];

          return false;
        }

        return true;
      })
      // Filter out pre-loaded values
      .filter((asyncProp) => {
        return !state.values.hasOwnProperty(asyncProp);
      })
    ;

    if (!asyncKeys.length) {
      return Promise.resolve(this.fulfillState(state, callback));
    }

    if (this.frozen) {
      throw new ResolverError([
        "Resolver is frozen for server rendering.",
        `${container.constructor.displayName} (#${container.id}) should have already resolved`,
        `"${asyncKeys.join("\", \"")}". (http://git.io/vvvkr)`,
      ].join(" "));
    }

    const promises = asyncKeys.map((prop) => {
      const valueOf = container.props.resolve[prop];
      const value = container.props.hasOwnProperty(prop)
        ? container.props[prop]
        : valueOf(container.props.props, container.props.context)
      ;

      return Promise.resolve(value).then((resolved) => {
        state.values[prop] = resolved;

        return resolved;
      });
    });

    return this.await(promises).then(
      () => this.fulfillState(state, callback),
      (error) => this.rejectState(error, state, callback)
    );
  }

  static createContainer(Component, props = {}) {
    if (!Component.hasOwnProperty("displayName")) {
      throw new ReferenceError("Resolver.createContainer requires wrapped component to have `displayName`");
    }

    class ComponentContainer extends React.Component {
      render() {
        return (
          <Container
            component={Component}
            context={this.context}
            props={this.props}
            {...props}
          />
        );
      }
    }

    ComponentContainer.contextTypes = props.contextTypes;
    ComponentContainer.displayName = `${Component.displayName}Container`;

    return ComponentContainer;
  }

  static render(element, node, instance = new Resolver()) {
    React.render((
      <Container resolver={instance}>
        {element}
      </Container>
    ), node);

    return instance;
  }

  static renderToString(element) {
    const resolver = new Resolver();
    const context = <Container resolver={resolver}>{element}</Container>;

    React.renderToString(context);

    return resolver.finish().then((data) => {
      resolver.freeze();

      var html = React.renderToString(context);
      return {
        data: resolver.states,
        toString() { return html; },
      };
    });
  }

  static renderToStaticMarkup(element) {
    const resolver = new Resolver();
    const context = <Container resolver={resolver}>{element}</Container>;

    React.renderToStaticMarkup(context);

    return resolver.finish().then((data) => {
      resolver.freeze();

      var html = React.renderToStaticMarkup(context);
      return {
        data: resolver.states,
        toString() { return html; },
      };
    });
  }

  static decorate(props = {}) {
    return Component => Resolver.createContainer(Component, props);
  }
}
