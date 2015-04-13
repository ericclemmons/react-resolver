# React Resolver ![https://img.shields.io/npm/v/react-resolver.svg](https://img.shields.io/npm/v/react-resolver.svg?style=flat-square)

> Isomorphic library to lazy-load data for React components

[![](https://img.shields.io/github/issues-raw/ericclemmons/react-resolver.svg?style=flat-square)](https://github.com/ericclemmons/react-resolver/issues)
[![](https://img.shields.io/travis/ericclemmons/react-resolver/master.svg?style=flat-square)](https://travis-ci.org/ericclemmons/react-resolver)
[![](https://img.shields.io/david/ericclemmons/react-resolver.svg?style=flat-square)](https://david-dm.org/ericclemmons/react-resolver#info=dependencies)
[![](https://img.shields.io/david/dev/ericclemmons/react-resolver.svg?style=flat-square)](https://david-dm.org/ericclemmons/react-resolver#info=devDependencies)


## Features

- **Promise-based** – Define & lazy-load component data dependencies and inject them as `props`.
- **Isomorphic** – Express/Koa/Hapi-friendly server-side rendering & progressive, client-side rendering.
- **Test friendly** – Containers promote separation between data-fetching & rendering.


## Demo

> ![Demo](demo.png)

[View Demo][demo]


- - -


- [Features](#features)
- [Demo](#demo)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  + [Client](#client)
  + [Server](#server)
- [Changelog][changelog]
- [Development](#development)
- [Authors](#authors)
- [License][license]

- - -


## Requirements

- React `v0.13.x`

_For browsers that don't nativeuly support promises, use [ES6 Promise](https://github.com/jakearchibald/es6-promise)._


## Installation

```shell
npm install --save react-resolver
```


## Usage

_Example is based on [Stargazers.js](https://github.com/ericclemmons/react-resolver/blob/master/examples/stargazers/components/Stargazers.js) in the [demo](#demo)._

Suppose you want to display list of users (e.g. `["Eric", "Evan", "Will", "Chad"]`),
but that data is loaded asynchronously via an API.

Rather than having your component handle data-fetching _and_ rendering,
you can create a "container" that fetches the data and only renders when ready:

```javascript
import React from "react";
import { Resolver } from "react-resolver";

class Users extends React.Component {
  render() {
    return (
      <ul>
        {this.props.users.map(user => (
          <li>{user}</li>
        ))}
      </ul>
    );
  }
}

Users.defaultProps = { limit: 5 };
Users.propTypes = { users: Raect.PropTypes.array.isRequired };

// Rather than `export default Users`, create a container:
export default Resolver.createContainer(Users, {
  resolve: {
    users: function(props) {
      return fetch(`/api/users?limit=${props.limit}`);
    }
  }
});

```


### Client

Replace `React.render` with `Resolver.render`, and you're all set!

```javascript
import React from "react";
import Resolver from "react-resolver";

Resolver.render(<Users />, document.getElementById("app"));
```


### Server

Because data has to be fetched asynchronously, `React.renderToString`
(and `React.renderToStaticMarkup`) won't have the data in time.

Instead, replace `React` with `Resolver` and you'll receive a promise
that resolves with the rendered output!

```javascript
import React from "react";
import Resolver from "react-resolver";

Resolver.renderToString(<Users />).then((string) => {
  reply(string);
}).catch((err) {
  // An error was thrown while rendering
  console.error(err);
});

```

- - -

## Development

If you'd like to contribute to this project, all you need to do is clone
this project and run:

```shell
$ npm install
$ npm test
```


## Authors

- Eric Clemmons (<eric@smarterspam.com>)


[changelog]: https://github.com/ericclemmons/react-resolver/blob/master/CHANGELOG.md
[demo]: https://cdn.rawgit.com/ericclemmons/react-resolver/master/examples/stargazers/public/index.html
[license]: https://github.com/ericclemmons/react-resolver/blob/master/LICENSE
