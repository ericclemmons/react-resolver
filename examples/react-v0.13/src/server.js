import express from "express";
import path from "path";
import React from "react";
import { Resolver } from "../../../src";
import Router from "react-router";

import routes from "./routes";

express()
  .get("/", function(req, res) {
    Router.run(routes, req.path, function(Handler, state) {
      res.send(React.renderToString(<Handler {...state} />));
    });
    //   Resolver
    //     .resolve(() => <Handler {...initialState} />)
    //     .then(function({ Resolved }) {
    //       res.send(React.renderToString(<Resolved />));
    //     })
    //     .catch(res.send)
    //   ;
    // });
  })
  .use(express.static(path.join(__dirname, "../public")))
  .listen(3000, function() {
    console.info("✅  Node server started at http://localhost:3000/");
  })
;
