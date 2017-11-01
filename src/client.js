import PropTypes from "prop-types";
import React from "react";

import Resolver from "./Resolver";

export default function client(Loader) {
  return function clientDecorator(Component) {
    return class ClientResolver extends Component {
      static displayName = `ClientResolver`

      static childContextTypes = {
        resolver: PropTypes.instanceOf(Resolver),
      }

      static contextTypes = {
        resolver: PropTypes.instanceOf(Resolver),
      }

      constructor(props, context) {
        super(props, context);

        this.enqueue = this.enqueue.bind(this);
        this.queue = [];
        this.state = {
          bypass: process.env.NODE_ENV === "test",
          loaded: false,
          server: true,
        };
      }

      componentDidMount() {
        this.setState({ server: false }, function() {
          Promise.all(this.queue).then(() => this.setState({ loaded: true }));
        });
      }

      enqueue(promise) {
        this.queue.push(promise);
        return promise;
      }

      render() {
        const { bypass, loaded, server } = this.state;

        const loader =  Loader ? <Loader /> : null;

        if (server) {
          return loader;
        }

        if (bypass || loaded) {
          return <Component {...this.props} />;
        }

        return (
          <div>
            {loader}

            <div style={{ display: "none" }}>
              <Resolver onResolve={this.enqueue}>
                {(resolved) => <Component {...this.props} {...resolved} />}
              </Resolver>
            </div>
          </div>
        );
      }
    };
  };
}
