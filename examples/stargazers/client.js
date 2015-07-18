import { history } from "react-router/lib/HashHistory";
import React from "react";
import { render } from "react-dom";
import Router from "react-router";
import ES6Promise from "es6-promise";

import routes from "./routes";

ES6Promise.polyfill();

render(
  <Router children={routes} history={history} />,
  document.getElementById("app"),
);
