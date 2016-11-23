import React from "react";

export default class PrettyError extends React.Component {
  static displayName = "PrettyError"

  render() {
    const { error } = this.props;

    return (
      <div className="card red darken-4">
        <div className="card-content white-text">
          <span className="card-title">
            {error.name}
          </span>
          <pre>
            {error.message}
            {error.data ? `\n\n${JSON.stringify(error.data, null, 2)}` : null}
          </pre>
        </div>

        <div className="card-action white-text">
          <span className="card-title">
            Stack Trace
          </span>
          <pre>
            {error.stack}
          </pre>
        </div>
      </div>
    );
  }
}
