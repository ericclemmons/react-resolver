import React from "react";
import cloneWithProps from "react/lib/cloneWithProps";

import ResolverError from "./ResolverError";

const { Children } = React;

class Container extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.children = [];

    this.id = this.getId();
    this.state = this.getResolver().getContainerState(this);
  }

  componentWillMount() {
    this.resolve();
  }

  componentWillUnmount() {
    this.getResolver().clearContainerState(this);
  }

  componentWillReceiveProps() {
    this.getResolver().clearContainerState(this);

    this.resolve();
  }

  getId() {
    const parent = this.context.parent;

    if (!parent) {
      return ".0";
    }

    const id = `${parent.id}.${parent.children.length}`;

    parent.children.push(this);

    return id;
  }

  getChildContext() {
    const parent = this;
    const resolver = this.getResolver();

    return {
      parent,
      resolver,
    };
  }

  getResolver() {
    const resolver = this.props.resolver || this.context.resolver;

    if (!resolver) {
      throw new ReferenceError("Resolver is not defined in either `context` or `props`.  (Perhaps missing a root <Container resolver={new Resolver()} />?)");
    }

    return resolver;
  }

  shouldComponentUpdate(props, state) {
    return state.fulfilled;
  }

  render() {
    if (!this.state.fulfilled) {
      return false;
    }
    
    const props = {
      ...this.state.values,
      ...this.props.props
    };

    if (this.props.component) {
      return (
        <this.props.component {...props} />
      );
    }

    if (this.props.element) {
      return cloneWithProps(this.props.element, props);
    }

    if (this.props.children) {
      if (Children.count(this.props.children) === 1) {
        return cloneWithProps(Children.only(this.props.children), props);
      }

      return (
        <span>
          { Children.map(
              this.props.children,
              (child, i) => cloneWithProps(child, { key: i, ...props})
            )
          }
        </span>
      );
    }

    throw new ResolverError("<Container /> requires one of the following props to render: `element`, `component`, or `children`");
  }

  resolve() {
    const nextState = this.getResolver().getContainerState(this);

    this.setState(nextState);

    if (!nextState.fulfilled) {
      this.getResolver().resolve(this, (finalState) => {
        return new Promise((resolve) => {
          this.setState(finalState, resolve);
        });
      });
    }
  }
}

Container.childContextTypes = {
  parent: React.PropTypes.instanceOf(Container),
  resolver: React.PropTypes.object.isRequired,
};

Container.contextTypes = {
  parent: React.PropTypes.instanceOf(Container),
  resolver: React.PropTypes.object,
};

Container.displayName = "ResolverContainer";

Container.propTypes = {
  component: React.PropTypes.any,
  element: React.PropTypes.element,
  resolve: React.PropTypes.object,
  resolver: React.PropTypes.object,
};

export default Container;
