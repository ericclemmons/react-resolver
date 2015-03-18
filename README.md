# React Resolver ![https://img.shields.io/npm/v/react-resolver.svg](https://img.shields.io/npm/v/react-resolver.svg?style=flat-square)

> Isomorphic library to _recursively_ lazy-load data for React components

[![](https://img.shields.io/github/issues-raw/ericclemmons/react-resolver.svg?style=flat-square)](https://github.com/ericclemmons/react-resolver/issues)
[![](https://img.shields.io/travis/ericclemmons/react-resolver/master.svg?style=flat-square)](https://travis-ci.org/ericclemmons/react-resolver)
[![](https://img.shields.io/david/ericclemmons/react-resolver.svg?style=flat-square)](https://david-dm.org/ericclemmons/react-resolver#info=dependencies)
[![](https://img.shields.io/david/dev/ericclemmons/react-resolver.svg?style=flat-square)](https://david-dm.org/ericclemmons/react-resolver#info=devDependencies)

- Define & lazy-load component data dependencies and inject them as `props`.
- Express/Koa/Hapi-friendly server-side rendering.
- Progressive, client-side rendering.
- Works with [React Router][3].


- - -

- [Intro](#intro)
- [Examples][2]
- [Installation](#installation)
- [Usage](#usage)
- [Changelog][6]
- [Development](#development)
- [Authors](#authors)
- [License][1]

- - -


## Intro

Similar to [ui-router][4] for Angular, React Resolver lets you define & load
data dependencies as close to the templates using them as possible: the _Components_.

You may be asking, **how is this different from [Relay & GraphQL][7]**?

Both projects are working to solve the similar problems:

> Data fetching is still a tricky problem, especially as applications become more complicated.

With [Relay & GraphQL][7]:

> Each component specifies its own data dependencies declaratively **using a query language called GraphQL**. The data is made available to the component via properties on `this.props`.

_(Emphasis my own)_

With React Router, whether you use [Flux-like
_Stores_][9], hand-crafted _Services_, or even isomorphic HTTP libraries like
[superagent][8], is **up to you**.

**Once Relay is released, you should be to make a smooth transition (if you'd like!),
as your templates should still be expecting the same data via `this.props`**.


## Installation

```shell
$ npm install --save react-resolver
```

```javascript
var Resolver = require('react-resolver');

// Create an instance
var resolver = new Resolver();

// or, if you prefer factories...
var resolver = Resolver.create();
```


## Usage

### 1. Specify Props to Lazy-Load

```javascript
var Resolver = require('react-resolver');

var UserView = React.createClass({
  mixins: [Resolver.mixin],

  statics: {
    resolve: {
      // Return a Promise
      user: function() {
        return UserStore.find(this.getParams().userId);
      },

      // or use a Callback
      user: function(done) {
        request.get(`/users/${this.getParams().userId}`, done);
      }
    }
  },
  ...
});
```


### 2.  Wrap your `<Route />`

Assuming you're using [React Router][3], you'll need to wrap your routes
to maintain `context`:

```javascript

var routes = (
  <Route handler={App}>
    <Route path="/users/:userId" name="bar" handler={User}>
  </Route>
);
var resolver  = require('resolver').create();
routes = resolver.route(routes);
```

This makes it possible for your `statics.resolve` props to access
`Router.State`, `Router.Navigation`, and other contexts.


### 3. Resolve & Render

#### Client

Because the client supports lazy-loading of components, you can use
`React.render` as usual.

The only caveat is, if you're using [react-router][3], you'll need to
wrap your routes with `resolver.route` to maintain context:

```javascript
var Resolver  = require('resolver');
var routes    = require('./routes');

var resolver = Resolver.create();

Router.run(resolver.route(routes), function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
```

#### Server

On the server, _all promises have to be resolved **before** rendering_
and sending the response via `resolver.resolve`.

Be sure to create a new instance of the `Resolver` per-request to avoid
leaking props to different users!

```javascript
var Resolver  = require('resolver')
var routes    = require('./routes');

// Your middleware here...
app.get('/', function(req, res) {
  var resolver = Resolver.create();

  Router.run(resolver.route(routes), function(Handler) {
    resolver.resolve(<Handler />).then(function(handled) {
      res.send(React.renderToStaticMarkup(handled));
    });
  });
});
```

- - -


## Development

```shell
$ npm install
$ npm link .
$ (cd examples/contacts/ && npm link react-resolver)
$ npm test
```

## Authors

- Eric Clemmons (<eric@smarterspam.com>)


[1]: https://github.com/ericclemmons/react-resolver/blob/master/LICENSE
[2]: https://github.com/ericclemmons/react-resolver/tree/master/examples
[3]: https://github.com/rackt/react-router
[4]: https://github.com/angular-ui/ui-router/wiki#resolve
[5]: https://gist.github.com/wincent/598fa75e22bdfa44cf47
[6]: https://github.com/ericclemmons/react-resolver/blob/master/CHANGELOG.md
[7]: http://facebook.github.io/react/blog/2015/02/20/introducing-relay-and-graphql.html
[8]: https://github.com/visionmedia/superagent
[9]: https://github.com/goatslacker/alt
