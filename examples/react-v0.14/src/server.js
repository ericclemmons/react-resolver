import express from "express";
import Location from "react-router/lib/Location";
import React from "react";
import { renderToString } from "react-dom/server";
import { Resolver } from "react-resolver";
import Router from "react-router";

import routes from "./routes";

express()
  // Let React handle all routes
  .get("*", function(req, res) {
    const location = new Location(req.path, req.query);

    Router.run(routes, location, (error, state, transition) => {
      if (error) {
        return res.status(500).send(error);
      }

      Resolver
        .resolve(() => <Router {...state} />)
        .then(({ Resolved, data }) => {
          res
            .status(200)
            .send(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>Stargazers Demo – React Resolver</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.min.css">
              </head>
              <body>
                <div id="app">${renderToString(<Resolved />)}</div>

                <script src="/client.min.js" async defer></script>
                <script>window.__REACT_RESOLVER_PAYLOAD__ = ${JSON.stringify(data)}</script>
              </body>
              </html>
            `)
          ;
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
