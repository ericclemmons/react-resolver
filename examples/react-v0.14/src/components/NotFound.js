import React from "react";

export default class NotFound extends React.Component {
  static displayName = "NotFound"

  render() {
    const { splat } = this.props.params;

    return (
      <div className="row">
        <div className="card">
          <div className="card-content">
            <span className="card-title deep-purple-text">
              404
            </span>

            <p>
              Unfortunately, this URL does not exist.
            </p>

            <blockquote>
              <pre>{splat}</pre>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}
