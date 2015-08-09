import ES6Promise from "es6-promise";
import { history } from "react-router/lib/BrowserHistory";
import React from "react";
import { Resolver } from "react-resolver";
import { Router } from "react-router";

import routes from "./routes";

ES6Promise.polyfill();

Resolver.render(
  () => <Router history={history} routes={routes} />,
  document.getElementById("app")
);
