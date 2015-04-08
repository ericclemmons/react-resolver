import React from "react/addons";

import Resolver from "./Resolver";

class ResolverContext extends React.Component {
  getChildContext() {
    const resolver = this.props.resolver || this.context.resolver;

    return { resolver };
  }

  render() {
    return React.addons.cloneWithProps(this.props.element, this.props);
  }
}

ResolverContext.childContextTypes = {
  resolver: React.PropTypes.any,
};

ResolverContext.contextTypes = {
  resolver: React.PropTypes.any,
};

ResolverContext.propTypes = {
  resolver: React.PropTypes.any,
};

export default ResolverContext;
