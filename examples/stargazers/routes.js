import React from "react";
import { DefaultRoute, Route } from "react-router";

import App from "./handlers/App";
import Home from "./handlers/Home";

export default (
  <Route path="/" handler={App}>
    <DefaultRoute name="home" handler={Home} />
  </Route>
)
