import axios from "axios";
import { Link } from "react-router";
import React from "react";
import { Resolver } from "react-resolver";

class User extends React.Component {
  render() {
    const user = this.props.user;

    return (
      <div className="container">
        <div className="card blue-grey darken-1">
          <div className="card-content">
            <span className="card-title">
              {user.login}
            </span>

            <ul className="collection z-depth-1">
              <li className="collection-item avatar">
                <img src={user.avatar_url} className="circle" />
                <span className="title">
                  {user.name}
                </span>
                <p>
                  {user.company}
                  <br />
                  {user.location}
                </p>
              </li>
            </ul>
          </div>

          <div className="card-action">
            <Link to="home" className="align-right">
              <i className="mdi-navigation-chevron-left" />
              Back
            </Link>

            <a href={user.html_url} target="_blank">
              View on Github
            </a>
          </div>
        </div>
      </div>
    );
  }
}

User.displayName = "User";

export default Resolver.createContainer(User, {
  contextTypes: {
    router: React.PropTypes.func.isRequired,
  },

  resolve: {
    user: (props, context) => {
      const { login } = context.router.getCurrentParams();
      const url = `https://api.github.com/users/${login}`;

      return axios.get(url).then(response => response.data);
    },
  },
});
