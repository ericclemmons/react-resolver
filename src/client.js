import React from "react";

export default function client() {
  return function clientDecorator(Component) {
    return class ClientResolver extends React.Component {
      displayName = `ClientResolver`

      constructor(props, context) {
        super(props, context);

        this.state = { visible: false };
      }

      componentDidMount() {
        this.setState({ visible: true });
      }

      render() {
        if (!this.state.visible) {
          return null;
        }

        return <Component {...this.props} />;
      }
    };
  };
}
