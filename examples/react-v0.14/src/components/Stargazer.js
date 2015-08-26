import axios from "axios";
import { Link } from "react-router";
import React from "react";

import { resolve } from "react-resolver";

@resolve("stargazer", function({ params }) {
  const { user } = params;
  const url = `https://api.github.com/users/${user}`;

  return axios.get(url).then(({ data }) => data);
})
export default class Stargazer extends React.Component {
  static displayName = "Stargazer"

  render() {
    const { stargazer } = this.props;

    return (
      <div className="container">
        <div className="card blue-grey darken-1">
          <div className="card-content">
            <span className="card-title">
              {stargazer.login}
            </span>

            <ul className="collection z-depth-1">
              <li className="collection-item avatar">
                <img src={stargazer.avatar_url} className="circle" />
                <span className="title">
                  {stargazer.name}
                </span>
                <p>
                  {stargazer.company}
                  <br />
                  {stargazer.location}
                </p>
              </li>
            </ul>
          </div>

          <div className="card-action">
            <Link to="/" className="align-right">
              <i className="mdi-navigation-chevron-left" />
              Back
            </Link>

            <a href={stargazer.html_url} target="_blank">
              View on Github
            </a>
          </div>
        </div>
      </div>
    );
  }
}
