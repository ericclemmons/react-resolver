import React from "react";

class ResolverContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = this.context.resolver.getContainerState(this);
  }

  componentWillMount() {
    if (!this.state.fulfilled) {
      this.context.resolver.resolve(this, this.setState.bind(this));
    }
  }

  shouldComponentUpdate(props, state) {
    return state.fulfilled;
  }

  render() {
    if (!this.state.fulfilled) {
      return false;
    }

    return (
      <this.props.component {...this.state.values} />
    );
  }
}

ResolverContainer.contextTypes = {
  id: React.PropTypes.string.isRequired,
  resolver: React.PropTypes.object.isRequired,
};

ResolverContainer.displayName = "ResolverContainer";

ResolverContainer.propTypes = {
  component: React.PropTypes.any.isRequired,
  resolve: React.PropTypes.object.isRequired,
};

export default ResolverContainer;
