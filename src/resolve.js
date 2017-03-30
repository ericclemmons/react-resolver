import React from "react";

import Resolver from "./Resolver";

const capitalize = (word) => {
  return word.replace(/^./, (letter) => letter.toUpperCase());
};

export default function resolve(prop, promise, opts) {
  if (!opts && typeof promise === 'object') {
    opts = promise;
    promise = null;
  }
  const asyncProps = !promise ? prop : { [prop]: promise };
  const asyncNames = Object.keys(asyncProps).map(capitalize).join("");

  return function resolveDecorator(Component) {
    return class PropResolver extends React.Component {
      static displayName = `${asyncNames}Resolver`

      render() {
        return (
          <Resolver props={this.props} resolve={asyncProps} {...opts}>
            {(resolved) => <Component {...this.props} {...resolved} />}
          </Resolver>
        );
      }
    };
  };
}
