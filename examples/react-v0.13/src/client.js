import ES6Promise from "es6-promise";
import React from "react";
import { Resolver } from "react-resolver";
import Router from "react-router";

import routes from "./routes";

ES6Promise.polyfill();

Router.run(routes, Router.HistoryLocation, (Root) => {
  Resolver.render(() => <Root />, document.getElementById("app"));
});
