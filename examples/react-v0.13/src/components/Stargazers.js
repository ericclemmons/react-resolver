import axios from "axios";
import React from "react";
import { resolve } from "react-resolver";
import { Link } from "react-router";

@resolve("user", ({ params, query }) => params.user || query.user)
@resolve("repo", ({ params, query }) => params.repo || query.repo)
@resolve("users", function({ user, repo }) {
  const url = `https://api.github.com/repos/${user}/${repo}/stargazers`;

  return axios.get(url).then(({ data }) => data);
})
export default class Stargazers extends React.Component {
  static propTypes = {
    users: React.PropTypes.array.isRequired,
  }

  static displayName = "Stargazers"

  render() {
    const { repo, user, users } = this.props;

    return (
      <section>
        <div className="card">
          <div className="card-content">
            <span className="card-title deep-purple-text">
              Stargazers for
              {" "}
              <code>
                {user}/{repo}
              </code>
            </span>
          </div>
          <div className="card-action">
            <iframe src={`https://ghbtns.com/github-btn.html?user=${user}&type=follow&count=true`} frameBorder="0" scrolling="0" width="150px" height="20px"></iframe>
            <iframe src={`https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=star&count=true`} frameBorder="0" scrolling="0" width="100px" height="20px"></iframe>
            <iframe src={`https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=watch&count=true&v=2`} frameBorder="0" scrolling="0" width="80px" height="20px"></iframe>
          </div>
        </div>

        {this.renderUsers(users, 6)}
      </section>
    );
  }

  renderGroup(cols, group, i) {
    const size = `s${12 / cols}`;

    return (
      <div key={`group-${i}`} className="row">
        {group.map(user => (
          <div key={user.id} className={`col ${size}`}>
            {this.renderUser(user)}
          </div>
        ))}
      </div>
    );
  }

  renderUser(user) {
    return (
      <div key={user.id} className="center-align">
        <Link to="user" params={{ user: user.login }}>
          <img src={user.avatar_url} alt="" className="circle responsive-img z-depth-1" />
          <br />
          {user.login}
        </Link>
      </div>
    );
  }

  renderUsers(users, cols) {
    const groups = [];
    const remaining = [].concat(users);

    while (remaining.length) {
      groups.push(remaining.splice(0, cols));
    }

    return groups.map(this.renderGroup.bind(this, cols));
  }
}
