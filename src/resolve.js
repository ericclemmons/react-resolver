import React from "react";

import Resolver from "./Resolver";

const capitalize = (word) => {
  return word.replace(/^./, (letter) => letter.toUpperCase());
};

export default function resolve(prop, promise) {
  const asyncProps = (arguments.length === 1) ? prop : { [prop]: promise };
  const asyncNames = Object.keys(asyncProps).map(capitalize).join("");

  return function resolveDecorator(Component) {
    return class PropResolver extends React.Component {
      displayName = `${asyncNames}Resolver`

      render() {
        const render = (props) => {
          return <Component {...this.props} {...props} />;
        };

        return (
          <Resolver props={this.props} render={render} resolve={asyncProps} />
        );
      }
    };
  };
}
