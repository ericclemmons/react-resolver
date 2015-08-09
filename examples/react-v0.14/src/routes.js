import React from "react";
import { Route } from "react-router";

import App from "./components/App";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Stargazer from "./components/Stargazer";
import Stargazers from "./components/Stargazers";

export default (
  <Route component={App}>
    // Query-able URLs (for POSTs & crawlers)
    <Route path="/repo" component={Stargazers} />

    // Canonical URLs
    <Route path="/" component={Home} />
    <Route path="/:user" component={Stargazer} />
    <Route path="/:user/:repo" component={Stargazers} />

    <Route path="/404" component={NotFound} />
  </Route>
);
