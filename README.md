# React Resolver ![https://img.shields.io/npm/v/react-router.svg](https://img.shields.io/npm/v/react-router.svg?style=flat-square)

> Isomorphic library to lazy-load data for React components

[![](https://img.shields.io/github/issues-raw/ericclemmons/react-router.svg?style=flat-square)](https://github.com/ericclemmons/react-router/issues)
[![](https://img.shields.io/travis/ericclemmons/react-router/master.svg?style=flat-square)](https://travis-ci.org/ericclemmons/react-router)
[![](https://img.shields.io/david/ericclemmons/react-router.svg?style=flat-square)](https://david-dm.org/ericclemmons/react-router#info=dependencies)
[![](https://img.shields.io/david/dev/ericclemmons/react-router.svg?style=flat-square)](https://david-dm.org/ericclemmons/react-router#info=devDependencies)

Checkout the [examples][2]!


## Status

**This project is undergoing eager, active development :)**

- [x] Define props as `static.resolve`
  - [x] Resolve props that are Promises
  - [x] Resolve props that have callbacks
  - [x] Resolve props that are synchronous
- [x] Server-side rendering
- [x] Client-side rendering
  - [ ] With state changes


## Installation

```shell
$ npm install --save react-resolver
```

```javascript
var Resolver = require('react-resolver');
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

- - -

## Authors

- Eric Clemmons (<eric@smarterspam.com>)


## [License][1]


[1]: https://raw.githubusercontent.com/ericclemmons/react-resolver/master/LICENSE
[2]: https://github.com/ericclemmons/react-resolver/tree/master/examples
[3]: https://github.com/rackt/react-router
