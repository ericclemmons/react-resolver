import React from "react";

import Container from "./Container";

export { Container };

export const createContainer = function(Component, props = {}) {
  class ComponentContainer extends React.Component {
    render() {
      return <Container component={Component} {...props} {...this.props} />;
    }
  }

  ComponentContainer.displayName = `${Component.displayName}Container`;

  return ComponentContainer;
};
