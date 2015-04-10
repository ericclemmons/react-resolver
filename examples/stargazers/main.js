/* eslint no-unused-vars: 0, no-undef: 0, react/react-in-jsx-scope: 0 */

import React from "react";
import { Container, Resolver } from "react-resolver";
import { DefaultRoute, Route } from "react-router";
import Router from "react-router";
import ES6Promise from "es6-promise";

import routes from "./routes";

const resolver = new Resolver();

ES6Promise.polyfill();

Router.run(routes, (Handler) => {
  React.render((
    <Container resolver={resolver}>
      <Handler />
    </Container>
  ), document.getElementById("app"));
});
