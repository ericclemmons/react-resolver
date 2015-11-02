import React from "react";

export default function context(name, type = React.PropTypes.any.isRequired) {
  return function contextDecorator(Component) {
    class ContextDecorator extends React.Component {
      render() {
        return <Component {...this.context} {...this.props} />;
      }
    }

    ContextDecorator.contextTypes = {[name]: type}
    ContextDecorator.displayName = `ContextDecorator`

    return ContextDecorator;
  };
}
