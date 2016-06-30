### `context`

Use this for gaining access to a context as a prop without the boilerplate
of setting `contextTypes`.

- `@context(key[, type])` – `type` defaults to `React.PropTypes.any.isRequired`.

```js
import React from "react";

import { context, resolve } from "react-resolver";

// When using react-router, it's useful to gain access to the router
@context("router")
// The `submit` prop is now a call to the router
@resolve("submit", function({ router }) {
  return (action) => router.transitionTo(action);
})
export default class Home extends React.Component {
```
