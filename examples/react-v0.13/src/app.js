import express from "express";
import React from "react";
import { Resolver } from "react-resolver";
import Router from "react-router";
import ServerLocation from "react-router-server-location";

import routes from "./routes";

export default express()
  // Serve minified assets
  .use(express.static("../dist"))

  // Let React handle all routes
  .get("*", function(req, res) {
    const location = new ServerLocation(req, res);

    Router.create({ location, routes }).run(function(Handler, state) {
      // Redirect any unknown to home
      if (!state.routes.length) {
        return res.redirect("/");
      }

      const notFound = state.routes.filter(({ name }) => name === "404").length;

      Resolver
        .resolve(() => <Handler {...state} />)
        .then(({ Resolved, data }) => {
          res
            .status(notFound ? 404 : 200)
            .send(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <title>Stargazers Demo – React Resolver</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.min.css">
              </head>
              <body>
                <div id="app">${React.renderToString(<Resolved />)}</div>

                <script src="/client.min.js"></script>
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
;
