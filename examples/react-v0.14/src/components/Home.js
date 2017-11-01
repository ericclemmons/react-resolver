import React from "react";

import { context, resolve } from "react-resolver";

@context("router")
@resolve("submit", function({ router }) {
  return (action) => router.transitionTo(action);
})
export default class Home extends React.Component {
  static displayName = "Home"

  constructor(props) {
    super(props);

    this.state = {
      action: "/repo",
      user: "ericclemmons",
      repo: "react-resolver",
    };
  }

  componentDidMount() {
    this.setState(this.computeState());
  }

  computeState(state) {
    const nextState = {
      ...this.state,
      ...state,
    };

    const { user, repo } = nextState;

    nextState.action = `/${user}/${repo}`;

    return nextState;
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState(this.computeState({ [name]: value }));
  }

  handleSubmit(event) {
    const { submit } = this.props;
    const { action } = this.state;

    submit(action);

    event.preventDefault();
  }

  render() {
    const { action, user, repo } = this.state;

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
              <form
                action={action}
                method="GET"
                onChange={::this.handleChange}
                onSubmit={::this.handleSubmit}
                className="col s12"
              >
                <div className="row">
                  <div className="input-field col s6">
                    <input id="user" name="user" type="text" className="validate" defaultValue={user} />
                    <label htmlFor="user" className="active">
                      Github User or Organization
                    </label>
                  </div>

                  <div className="input-field col s6">
                    <input id="repo" name="repo" type="text" className="validate" defaultValue={repo} />
                    <label htmlFor="repo" className="active">
                      Repository
                    </label>
                  </div>
                </div>

                <div className="row right-align">
                  <div className="col s12">
                    <button className="btn waves-effect waves-light" type="submit">
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
