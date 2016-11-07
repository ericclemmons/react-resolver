### Render on the Client

Again, if we're only rendering on the client, we can render like normal:

```js
import React from "react";

React.render(<Router ... />, document.getElementById("app"));
```

### _Resolve_ on the Client

If you have a universal application & render on the server,
React Resolver **handles bootstrapping server-rendered markup** via
`Resolver.render` instead of `React.render`:

```js
import { Resolver } from "react-resolver";

Resolver.render(
  () => <Router ... />,
  document.getElementById("app")
); 
```
