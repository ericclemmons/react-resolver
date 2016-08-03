### 5. Resolve on the Server

The server will look very familiar to the client-side version.  The difference
being, `Resolver.resolve` will async render the application, fetch all data, &
return a `<Resolved />` component ready for `React.render`, as well as the
`data` needed to bootstrap the client:

```js
import { renderToString } from "react-dom/server";
import { match, RouterContext } from "react-router";
import { Resolver } from "react-resolver";

match({ routes, location }, (error, redirectLocation, renderProps) => {
  Resolver
    .resolve(() => <RouterContext {...renderProps} />) // Pass a render function for context!
    .then(({ Resolved, data }) => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <body>
            <div id="app">${renderToString(<Resolved />)}</div>

            <script>window.__REACT_RESOLVER_PAYLOAD__ = ${JSON.stringify(data)}</script>
            <script src="/client.min.js" async defer></script>
          </body>
        </html>
      `)
    })
    .catch((error) => res.status(500).send(error)) // Just in case!
  ;
});
```

Notice the presence of `window.__REACT_RESOLVER_PAYLOAD__`.  This is
the object that `Resolver.render` on the client will anticipate & leverage
for bootstrapping the client.

**Enjoy writing universal apps with clarity around data requirements!**
