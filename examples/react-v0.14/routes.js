import React from "react";
import { Redirect, Route } from "react-router";

import App from "./components/App";
import Home from "./components/Home";
import Stargazers from "./components/Stargazers";
import User from "./components/User";

export default (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route path="/users/:login" component={User} />
    <Route path="/:user/:repo" component={Stargazers} />
    <Redirect from="*" to="/" />
  </Route>
);
