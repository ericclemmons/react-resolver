import React from "react";

import Container from "./Container";

let counter = 0;

export default class Resolver {
  constructor(states = {}) {
    this.container = <Container resolver={this} />;
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

      return this.container;
    });
  }

  fulfillState(state, callback) {
    state.error = undefined;
    state.fulfilled = true;
    state.rejected = false;

    return callback ? callback(state) : state;
  }

  getContainerState(container) {
    const { id } = container.context;

    const state = (id && this.states.hasOwnProperty(id)) ? this.states[id] : {
      fulfilled: false,
      rejected: false,
      values: {},
    };

    if (id && !this.states.hasOwnProperty(id)) {
      this.states[id] = state;
    }

    return state;
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
        return state.values.hasOwnProperty(asyncProp);
      })
    ;

    if (!asyncKeys.length) {
      return Promise.resolve(this.fulfillState(state, callback));
    }

    const promises = asyncKeys.map((prop) => {
      const valueOf = container.props.resolve[prop];
      const value = container.props.hasOwnProperty(prop) ? container.props[prop]: valueOf(container.props);

      return Promise.resolve(value).then((value) => {
        state.values[prop] = value;

        callback(state);

        return value;
      });
    });

    return this.await(promises).then(
      () => this.fulfillState(state, callback),
      (error) => this.rejectState(error, state, callback)
    );
  }

  then(callback) {
    return this.finish().then(callback);
  }

  static createContainer(Component, props = {}) {
    if (!Component.hasOwnProperty("displayName")) {
      throw new ReferenceError("Resolver.createContainer requires wrapped component to have `displayName`");
    }

    const name = `${Component.displayName}Container`;
    const id = `${counter}-${name}`;

    class ComponentContainer extends React.Component {
      getChildContext() {
        return { id };
      }

      render() {
        return (
          <Container
            component={Component}
            {...props}
            {...this.props}
          />
        );
      }
    }

    ComponentContainer.childContextTypes = {
      id: React.PropTypes.string.isRequired,
    };

    ComponentContainer.displayName = name;

    return ComponentContainer;
  }

  static render(element, node) {
    return new Resolver(element).then((resolved) => {
      return React.render(resolved, node);
    });
  }

  static renderToStaticMarkup(element) {
    return new Resolver(element).then((resolved) => {
      return React.renderToStaticMarkup(resolved);
    });
  }
}
