import React from "react";
import { NotFoundRoute, Route } from "react-router";

import App from "./components/App";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Stargazers from "./components/Stargazers";
import User from "./components/User";

export default (
  <Route handler={App}>
    <Route name="home" path="/" handler={Home} />
    <Route name="profile" path="/profile" handler={User} />
    <Route name="stargazers" path="/stargazers" handler={Stargazers} />
    <NotFoundRoute name="404" handler={NotFound} />
  </Route>
);
