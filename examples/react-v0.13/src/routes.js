import React from "react";
import { Redirect, Route } from "react-router";

import App from "./components/App";
import Home from "./components/Home";
import Stargazers from "./components/Stargazers";
import User from "./components/User";

export default (
  <Route handler={App}>
    <Route name="home" path="/" handler={Home} />
    <Route name="user" path="/users/:login" handler={User} />
    <Route name="repo" path="/:user/:repo" handler={Stargazers} />
    <Redirect from="*" to="/" />
  </Route>
);
