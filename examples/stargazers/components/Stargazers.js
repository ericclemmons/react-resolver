import axios from "axios";
import React from "react";
import { Resolver } from "react-resolver";
import { Link } from "react-router";

@Resolver.decorate({
  resolve: {
    users: function(props) {
      const url = `https://api.github.com/repos/${props.user}/${props.repo}/stargazers`;

      return axios.get(url).then(response => response.data);
    },
  },
})
export default class Stargazers extends React.Component {
  static displayName = "Stargazers";

  static propTypes = {
    users: React.PropTypes.array.isRequired
  };

  render() {
    return (
      <section>
        <div className="card">
          <div className="card-content">
            <span className="card-title deep-purple-text">Stargazers</span>
            <p>
              These are all of the cool people who've starred this project!
            </p>
          </div>
          <div className="card-action">
            <iframe src="https://ghbtns.com/github-btn.html?user=ericclemmons&repo=react-resolver&type=star&count=true" frameBorder="0" scrolling="0" width="100px" height="20px"></iframe>
            <iframe src="https://ghbtns.com/github-btn.html?user=ericclemmons&repo=react-resolver&type=watch&count=true&v=2" frameBorder="0" scrolling="0" width="60px" height="20px"></iframe>
          </div>
        </div>

        {this.renderUsers(this.props.users, 6)}
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
        <Link to="user" params={{ login: user.login }}>
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
