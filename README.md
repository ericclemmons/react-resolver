# React Resolver ![https://img.shields.io/npm/v/react-resolver.svg](https://img.shields.io/npm/v/react-resolver.svg?style=flat-square) [![](https://img.shields.io/github/issues-raw/ericclemmons/react-resolver.svg?style=flat-square)](https://github.com/ericclemmons/react-resolver/issues) [![](https://img.shields.io/travis/ericclemmons/react-resolver/master.svg?style=flat-square)](https://travis-ci.org/ericclemmons/react-resolver) [![](https://img.shields.io/david/ericclemmons/react-resolver.svg?style=flat-square)](https://david-dm.org/ericclemmons/react-resolver#info=dependencies)

> Async-rendering & data-fetching for universal React applications.

React Resolver lets you **define data requirements _per-component_**
and will **handle the nested, async rendering on both the server & client for you.**

[![](https://img.shields.io/badge/slack-@react--resolver-61DAFB.svg?style=flat-square)](http://www.reactiflux.com)
[![](https://img.shields.io/badge/GITTER-join%20chat-green.svg?style=flat-square)](https://gitter.im/ericclemmons/react-resolver?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

- - -

## Why?

[React][react]'s rendering is synchronous by design.
As a result, rendering on the server is left as an exercise for the rest of the
community to figure out.

There are some cludgy solutions for this, most of which require having
**fat ~~handlers~~ ~~components~~ controllers** at the top of your application
that are responsible for **marshalling data for all components under them**.

For a non-trivial application, this means mixing concerns between your
specialized components and the _controllers_, which is conceptually difficult
and programmatically annoying to maintain.


## How?

The simplest example is a pure, client-side only application.  Afterwards,
we can change a few lines to turn this into a universal application.

If you're the visual type, **view the examples**:

- [React v0.13 + React Router v0.13 Example](https://github.com/ericclemmons/react-resolver/tree/v2/examples/react-v0.13)
- [React v0.14 + React Router 1.0 Example](https://github.com/ericclemmons/react-resolver/tree/v2/examples/react-v0.14)


### Dependencies

- React `v0.13` or `v0.14`

_For browsers that don't natively support Promises, use [ES6 Promises](https://github.com/jakearchibald/es6-promise)._


### 1. Install `react-resolver`

```shell
$ npm install --save react-resolver
```


### 2. Decorate Components with Data

Suppose you have the following `Stargazer` component to render a Github user's
profile:

```js
export default class Stargazer extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
  }

  render() {
    /* Render profile from this.props.user */
  }
}
```

In 2014, you would use `componentWillMount` to fire off an AJAX request for
the profile, then use `setState` to trigger a re-render with the data.

**This won't work on the server-side**, and it's annoying to test.

According to most universal boilerplates, we'd put `static fetchData()` function
in our component for a middleware or library to handle, rendering the component
when data comes back.

**This only works for _fat controllers_ at the top of your application**,
usually defined by a [React Router][router] `<Route>`.

Instead, let's decorate it:

```js
import { resolve } from "react-resolver";

// Assuming this _is_ from <Route> component matching `/users/ericclemmons`
@resolve("user", function(props) {
  return axios
    .get(`https://api.github.com/users/${props.params.user}`)
    .then((response) => response.data)
  ;
})
export default class Stargazer extends React.Component {
```

Or, if [ES7 decorators][decorators] aren't your bag:

```js
class Stargazer extends React.Component {
  ...
}

export default resolve(Stargazer)("user", function(props) { ... });
```


### 3. Render on the Client

Again, if we're only rendering on the client, we can render like normal:

```js
import React from "react";

Router.run(routes, location, (Root) => {
  React.render(<Root />, document.getElementById("app"));
});
```

**The End**.  _(Unless you want to see how to build a universal application)_


### 4. Resolve on the Client

React Resolver **handles bootstrapping server-rendered markup** via
`Resolver.render`:

```js
import { Resolver } from "react-resolver";

Router.run(routes, location, (Root) => {
  // To preserver context, you have to pass a render function!
  Resolver.render(() => <Root />, document.getElementById("app"));
});
```


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

**Enjoy writing universal apps with clarity around data requirements!**


## Development

If you'd like to contribute to this project, all you need to do is clone
this project and run:

```shell
$ npm install
$ npm test
```


## Authors

- [Eric Clemmons](mailto:eric@smarterspam.com>) ([@ericclemmons][twitter])


## [License][license]


## Collaboration

If you have questions or issues, please [open an issue][issue]!


[1]: https://github.com/ericclemmons/react-resolver/blob/v1/README.md
[2]: https://github.com/ericclemmons/react-resolver/blob/v2/README.md
[changelog]: https://github.com/ericclemmons/react-resolver/blob/master/CHANGELOG.md
[decorators]: https://github.com/wycats/javascript-decorators
[demo]: https://cdn.rawgit.com/ericclemmons/react-resolver/master/examples/stargazers/public/index.html
[issue]: https://github.com/ericclemmons/react-resolver/issues/new
[license]: https://github.com/ericclemmons/react-resolver/blob/master/LICENSE
[react]: http://facebook.github.io/react/
[router]: https://github.com/rackt/react-router/
[twitter]: https://twitter.com/ericclemmons/
[upcoming]: https://github.com/ericclemmons/react-resolver/blob/master/CHANGELOG.md#upcoming
