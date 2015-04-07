import cuid from "cuid";
import React from "react";

import Container from "./Container";
import Context from "./Context";

export default class Resolver {
  constructor(element, states = {}) {
    this.promises = [];
    this.root = <Context element={element} resolver={this} />;
    this.states = states;

    React.renderToStaticMarkup(this.root);
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

      return this.root;
    });
  }

  getContainerState(container) {
    const { id } = container.context;

    if (!this.states.hasOwnProperty(id)) {
      this.states[id] = {
        fulfilled: false,
        error: undefined,
        rejected: false,
        values: {},
      };
    }

    return this.states[id];
  }

  resolve(container, callback) {
    const { props } = container;
    const state = this.getContainerState(container);

    const promises = Object.keys(props.resolve).map((prop) => {
      const valueOf = props.resolve[prop];
      const value = props.hasOwnProperty(prop) ? props[prop]: valueOf(props);

      return Promise.resolve(value).then((value) => {
        state.values[prop] = value;

        callback(state);

        return value;
      });
    });

    return this.await(promises).then(() => {
      state.error = undefined;
      state.fulfilled = true;
      state.rejected = false;

      callback(state);
    }, (error) => {
      state.error = error;
      state.fulfilled = false;
      state.rejected = true;

      throw new Error(`${this.constructor.displayName} was rejected: ${error}`);
    });
  }

  then(callback) {
    return this.finish().then(callback);
  }

  static createContainer(Component, props = {}) {
    if (!Component.hasOwnProperty("displayName")) {
      throw new ReferenceError("Resolver.createContainer requires wrapped component to have `displayName`");
    }

    const id = cuid();

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

    ComponentContainer.displayName = `${Component.displayName}Container`;

    return ComponentContainer;
  }

  static renderToStaticMarkup(element) {
    return new Resolver(element).then((resolved) => {
      return React.renderToStaticMarkup(resolved);
    });
  }
}
