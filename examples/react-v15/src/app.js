import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { Resolver } from "react-resolver";
import { match, RouterContext } from "react-router";

import routes from "./routes";

export default express()
  // Serve minified assets
  .use(express.static(path.join(__dirname, "../dist")))
  .use(express.static(path.join(__dirname, "../public")))

  // Let React handle all routes
  .get("*", function(req, res) {
    match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
      if (error) {
        return res.status(500).send(error);
      }
          console.log('kkk3');

      Resolver
        .resolve(() => <RouterContext {...renderProps} />)
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

                <script>window.__REACT_RESOLVER_PAYLOAD__ = ${JSON.stringify(data)}</script>
                <script src="/client.min.js"></script>
              </body>
              </html>
            `)
          ;
        })
        .catch((error) => {
          if (error.response) {
            res.status(error.response.status).send(error.response.statusText);
          } else {
            res.status(500).send('Internal server error');
          }
        })
      ;
    });
  })
;
