import ES6Promise from "es6-promise";
import React from "react";
import { Resolver } from "react-resolver";
import { Router, browserHistory } from "react-router";

import routes from "./routes";

ES6Promise.polyfill();

Resolver.render(
  () => <Router history={browserHistory} routes={routes} />,
  document.getElementById("app")
);
