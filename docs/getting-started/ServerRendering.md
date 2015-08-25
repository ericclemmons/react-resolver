### 5. Resolve on the Server

The server will look very familiar to the client-side version.  The difference
being, `Resolver.resolve` will async render the application, fetch all data, &
return a `<Resolved />` component ready for `React.render`, as well as the
`data` needed to bootstrap the client:

```js
import { Resolver } from "react-resolver";

Router.create({ location, routes }).run((Handler, state) => {
  Resolver
    .resolve(() => <Handler {...state} />) // Pass a render function for context!
    .then(({ Resolved, data }) => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <body>
            <div id="app">${React.render(<Resolved />)}</div>

            <script src="/client.min.js" async defer></script>
            <script>
              window.__REACT_RESOLVER_PAYLOAD__ = ${JSON.stringify(data)}
            </script>
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
