### 3. Render on the Client

Again, if we're only rendering on the client, we can render like normal:

```js
import React from "react";

Router.run(routes, location, (Root) => {
  React.render(<Root />, document.getElementById("app"));
});
```

### 4. _Resolve_ on the Client

If you have a universal application & render on the server,
React Resolver **handles bootstrapping server-rendered markup** via
`Resolver.render` instead of `React.render`:

```js
import { Resolver } from "react-resolver";

Router.run(routes, location, (Root) => {
  // To preserver context, you have to pass a render function!
  Resolver.render(() => <Root />, document.getElementById("app"));
});
```
