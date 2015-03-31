import React from "react";

class ResolverContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      rejected: false,
      fulfilled: false,
    };
  }

  componentWillMount() {
    const keys = Object.keys(this.props.resolve);

    const promises = keys.map((key) => {
      const valueOf = this.props.resolve[key];

      return Promise.resolve(valueOf(this.props));
    });

    Promise.all(promises).then((values) => {
      const fulfilled = {};

      values.forEach((value, i) => {
        const key = keys[i];

        fulfilled[key] = value;
      });

      this.fulfill(fulfilled);
    }, this.reject);
  }

  fulfill(values) {
    this.setState({ fulfilled: values });
  }

  reject(value) {
    this.setState({ rejected: value });

    throw new Error(`${this.constructor.displayName} was rejected: ${value}`);
  }

  shouldComponentUpdate(props, state) {
    return !!state.fulfilled;
  }

  render() {
    if (!this.state.fulfilled) {
      return false;
    }

    return (
      <this.props.component {...this.props} {...this.state.fulfilled} />
    );
  }
}

ResolverContainer.propTypes = {
  resolve: React.PropTypes.object.isRequired,
};

export default ResolverContainer;
