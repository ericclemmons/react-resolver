import React from "react";
import { NotFoundRoute, Route } from "react-router";

import App from "./components/App";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Stargazer from "./components/Stargazer";
import Stargazers from "./components/Stargazers";

export default (
  <Route handler={App}>
    // Query-able URLs (for POSTs & crawlers)
    <Route name="query.repo" path="/repo" handler={Stargazers} />

    // Canonical URLs
    <Route name="home" path="/" handler={Home} />
    <Route name="user" path="/:user" handler={Stargazer} />
    <Route name="repo" path="/:user/:repo" handler={Stargazers} />

    <NotFoundRoute name="404" handler={NotFound} />
  </Route>
);
