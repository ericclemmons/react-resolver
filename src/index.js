import React from "react";

import Container from "./Container";

const Resolver = { Container };

Resolver.createContainer = function(Component, props = {}) {
  class ComponentContainer extends React.Component {
    render() {
      return <Container component={Component} {...props} {...this.props} />;
    }
  }

  ComponentContainer.displayName = `${Component.displayName}Container`;
  ComponentContainer.propTypes = Container.propTypes;

  return ComponentContainer;
};

export default Resolver;
