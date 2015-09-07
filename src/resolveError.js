import React from "react";

import Resolver from "./Resolver";

export default function resolve(prop = "error") {
  return function resolveErrorDecorator(Component) {
    return class ResolveError extends React.Component {
      static displayName = `ResolveError`

      constructor(props, context) {
        super(props, context);

        this.state = { [prop]: undefined };
      }

      handleCatch(error) {
        this.setState({ [prop]: error });
      }

      handleResolve(promise) {
        promise.catch((error) => this.handleCatch(error));
      }

      render() {
        return (
          <Resolver onResolve={(promise) => this.handleResolve(promise)}>
            {(props) => <Component {...this.props} {...props} {...this.state} />}
          </Resolver>
        );
      }
    };
  };
}
