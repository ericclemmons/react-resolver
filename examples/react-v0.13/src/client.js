import ES6Promise from "es6-promise";
import React from "react";
import Router from "react-router";

import routes from "./routes";

ES6Promise.polyfill();

Router.run(routes, Router.HashLocation, (Root, state) => {
  React.render(<Root {...state} />, document.getElementById("app"));
});
