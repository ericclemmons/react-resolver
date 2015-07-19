import React from "react";

export default function context(name, type = React.PropTypes.any.isRequired) {
  return function contextDecorator(Component) {
    class ContextDecorator extends React.Component {
      static contextTypes = {
        [name]: type,
      }

      displayName = "ContextDecorator"

      render() {
        return <Component {...this.context} {...this.props} />;
      }
    }

    return ContextDecorator;
  };
}
