import React from "react";

class ResolverContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      rejected: false,
      fulfilled: false,
      values: {},
    };
  }

  componentWillMount() {
    const keys = Object.keys(this.props.resolve).filter((key) => {
      return !this.props.hasOwnProperty(key);
    });

    const promises = keys.map((key) => {
      const valueOf = this.props.resolve[key];

      // Individually set values upon resolution
      return Promise.resolve(valueOf(this.props)).then((value) => {
        const values = this.state.values;

        values[key] = value;

        this.setState({ values });
      });
    });

    Promise.all(promises).then((values) => {
      this.fulfill(values);
    }, this.reject);
  }

  fulfill(values) {
    this.setState({
      fulfilled: true,
      rejected: false,
      values,
    });
  }

  reject(error) {
    this.setState({
      fulfilled: false,
      error,
      rejected: true,
    });

    throw new Error(`${this.constructor.displayName} was rejected: ${error}`);
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
