import fs from "fs";
import jsdom from "jsdom";
import React from "react";
import { Resolver } from "react-resolver";
import Router from "react-router";

import routes from "../routes";

global.document = jsdom.jsdom("<!DOCTYPE html><html><body></body></html>");

const layout = fs.readFileSync(`${__dirname}/../layout.html`, "utf8");

Router.run(routes, (Handler) => {
  Resolver.renderToString(<Handler />).then((string) => {
    const html = layout.replace(/<noscript>[\S\s.]*<\/noscript>/m, string);
    
    process.stdout.write(html);
  }).catch((error) => {
    throw error;
  });
});
