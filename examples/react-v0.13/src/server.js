import express from "express";
import React from "react";
import { Resolver } from "react-resolver";
import Router from "react-router";
import ServerLocation from "react-router-server-location";

import routes from "./routes";

express()
  // Let React handle all routes
  .get("*", function(req, res) {
    const location = new ServerLocation(req, res);

    Router.create({ location, routes }).run(function(Handler, state) {
      // Redirect any unknown to home
      if (!state.routes.length) {
        return res.redirect("/");
      }

      Resolver
        .resolve(() => <Handler {...state} />)
        .then(({ Resolved, data }) => {
          const rendered = React.renderToString(<Resolved />);

          res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>Stargazers Demo – React Resolver</title>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.min.css">
            </head>
            <body>
              <div id="app">${rendered}</div>

              <script src="client.min.js" async defer></script>
              <script>window.__REACT_RESOLVER_PAYLOAD__ = ${JSON.stringify(data)}</script>
            </body>
            </html>
          `);
        })
        .catch((error) => {
          res.status(500).send(error);
        })
      ;
    });
  })
  .listen(3000, function() {
    console.info("✅  Node server started at http://localhost:3000/");
  })
;
