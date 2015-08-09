import express from "express";
import Location from "react-router/lib/Location";
import React from "react";
import { renderToString } from "react-dom/server";
import Router from "react-router";
import { Resolver } from "react-resolver";
// import ServerLocation from "react-router-server-location";

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

    // const location = new ServerLocation(req, res);
    //
    // Router.create({ location, routes }).run(function(Handler, state) {
    //   // Redirect any unknown to home
    //   if (!state.routes.length) {
    //     return res.redirect("/");
    //   }
    //
    //   const notFound = state.routes.filter(({ name }) => name === "404").length;
    // const notFound = 0;
    //
    //   Resolver
    //     .resolve(() => <Handler {...state} />)
    //     .then(({ Resolved, data }) => {
    //     })
    //     .catch((error) => {
    //       res.status(500).send(error);
    //     })
    //   ;
    // });
  })
  .listen(3000, function() {
    console.info("✅  Node server started at http://localhost:3000/");
  })
;
