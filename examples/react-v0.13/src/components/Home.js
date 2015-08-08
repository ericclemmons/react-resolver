import React from "react";

import { context, resolve } from "../../../../src";

@context("router")
@resolve("submit", function({ router }) {
  return ({ user, repo }) => router.transitionTo(`/${user}/${repo}`);
})
export default class Home extends React.Component {
  displayName = "Home"

  constructor(props) {
    super(props);

    this.state = {
      user: "ericclemmons",
      repo: "react-resolver",
    };
  }

  handleChange(event) {
    const { name, value } = event.currentTarget;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    const { submit } = this.props;
    const { user, repo } = this.state;

    event.preventDefault();

    submit({ user, repo });
  }

  render() {
    const { submit } = this.props;
    const { user, repo } = this.state;

    return (
      <section>
        <div className="card">
          <div className="card-content">
            <span className="card-title deep-purple-text">
              View a Project's Stargazers
            </span>
          </div>
          <div className="card-action">
            <div className="row">
              <form onSubmit={this.handleSubmit.bind(this)} className="col s12">
                <div className="row">
                  <div className="input-field col s6">
                    <input id="user" name="user" type="text" className="validate" defaultValue="ericclemmons" onChange={this.handleChange.bind(this)} />
                    <label htmlFor="user" className="active">
                      Github User or Organization
                    </label>
                  </div>

                  <div className="input-field col s6">
                    <input id="repo" name="repo" type="text" className="validate" defaultValue="react-resolver" onChange={this.handleChange.bind(this)} />
                    <label htmlFor="repo" className="active">
                      Repository
                    </label>
                  </div>
                </div>

                <div className="row right-align">
                  <div className="col s12">
                    <button className="btn waves-effect waves-light" type="submit" name="action">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
