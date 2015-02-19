# React Resolver ![https://img.shields.io/npm/v/react-resolver.svg](https://img.shields.io/npm/v/react-resolver.svg?style=flat-square)

> Isomorphic library to lazy-load data for React components

[![](https://img.shields.io/github/issues-raw/ericclemmons/react-resolver.svg?style=flat-square)](https://github.com/ericclemmons/react-resolver/issues)
[![](https://img.shields.io/travis/ericclemmons/react-resolver/master.svg?style=flat-square)](https://travis-ci.org/ericclemmons/react-resolver)
[![](https://img.shields.io/david/ericclemmons/react-resolver.svg?style=flat-square)](https://david-dm.org/ericclemmons/react-resolver#info=dependencies)
[![](https://img.shields.io/david/dev/ericclemmons/react-resolver.svg?style=flat-square)](https://david-dm.org/ericclemmons/react-resolver#info=devDependencies)

Inspired by [ui-router][4] for Angular,
React Resolver allows you to:

- Define & lazy-load component data dependencies and inject them as `props`.
- Express/Koa/Hapi-friendly server-side rendering.
- Progressive, client-side rendering.
- Works with [React Router][3]!
- Similar goals as [Facebook's Relay][5]

Checkout the [examples][2]!


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
var UserView = React.createClass({
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
var resolver  = require('resolver').create();
var routes    = resolver.route(require('./routes'));
```

This makes it possible for your `statics.resolve` props to access
`Router.State`, `Router.Navigation`, and other contexts.


### 3. Resolve & Render

```javascript
var resolver  = require('resolver').create();
var routes    = resolver.route(require('./routes'));

Router.run(routes, function(Handler) {
  resolver.handle(Handler).then(function(resolved) {
    // On the Client
    React.render(resolved, document.getElementById('app'));

    // on the Server
    res.send(React.renderToStaticMarkup(resolved));
  });
});
```

**Remember**, if you're rendering on the server you want a _new instance of `Resolver`_ for each request!

- - -


## Development

```shell
$ npm install
$ npm start
```


### Testing

```shell
$ npm test
```


## Authors

- Eric Clemmons (<eric@smarterspam.com>)


## [License][1]


[1]: https://raw.githubusercontent.com/ericclemmons/react-resolver/master/LICENSE
[2]: https://github.com/ericclemmons/react-resolver/tree/master/examples
[3]: https://github.com/rackt/react-router
[4]: https://github.com/angular-ui/ui-router/wiki#resolve
[5]: https://gist.github.com/wincent/598fa75e22bdfa44cf47
