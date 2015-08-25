# React Resolver ![https://img.shields.io/npm/v/react-resolver.svg](https://img.shields.io/npm/v/react-resolver.svg?style=flat-square) [![](https://img.shields.io/github/issues-raw/ericclemmons/react-resolver.svg?style=flat-square)](https://github.com/ericclemmons/react-resolver/issues) [![](https://img.shields.io/travis/ericclemmons/react-resolver/master.svg?style=flat-square)](https://travis-ci.org/ericclemmons/react-resolver) [![](https://img.shields.io/david/ericclemmons/react-resolver.svg?style=flat-square)](https://david-dm.org/ericclemmons/react-resolver#info=dependencies)

> Async-rendering & data-fetching for universal React applications.

React Resolver lets you **define data requirements _per-component_**
and will **handle the nested, async rendering on both the server & client for you.**

For example, the following will load & provide `this.props.user` for the
`UserProfile` component:

```js
import { resolve } from "react-resolver";

@resolve("user", function(props) {
  return http.get(`/api/users/${props.params.userId}`);
})
class UserProfile extends React.Component {
  render() {
    const { user } = this.props;
    ...
  }
}
```

This is the equivalent to asynchronously loading `user` and providing it to
the component as if it were provided directly:

```xml
<UserProfile user={user} />
```

This makes components _pure_, _stateless_, and _easy to test_ as a result.

[![](https://img.shields.io/badge/slack-@react--resolver-61DAFB.svg?style=flat-square)](http://www.reactiflux.com)
[![](https://img.shields.io/badge/GITTER-join%20chat-green.svg?style=flat-square)](https://gitter.im/ericclemmons/react-resolver?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

- - -

### Installation

_For environments that don't have native `Promise` support,
install [ES6 Promise](https://github.com/jakearchibald/es6-promise)._

```shell
$ npm install --save react-resolver
```


## Documentation

Complete documentation can be found here:
> <http://ericclemmons.github.io/react-resolver/>

- [Introduction](/docs/introduction)
- [Getting Started](/docs/getting-started)
- [API Reference](/docs/api)
- [Troubleshooting](/docs/Troubleshooting.md)

- - -

## Development

If you'd like to contribute to this project, all you need to do is clone
this project and run:

```shell
$ npm install
$ npm test
```


## [Contributors](https://github.com/ericclemmons/react-resolver/graphs/contributors)

- [Eric Clemmons](mailto:eric@smarterspam.com>) ([@ericclemmons][twitter])
- [Kier Borromeo](https://github.com/srph)
- [Dustan Kasten](https://github.com/iamdustan)
- [Adrian Philipp](https://github.com/adri)
- [Daniel Lo Nigro](https://github.com/Daniel15)
- [Daniel Chao](https://github.com/bioball)
- [Frederick Fogerty](https://github.com/frederickfogerty)
- [Josh Perez](https://github.com/goatslacker)


## [License][license]

> Internet Systems Consortium license
> ===================================
>
> Copyright (c) 2015 Eric Clemmons
>
> Permission to use, copy, modify, and/or distribute this software for any purpose
> with or without fee is hereby granted, provided that the above copyright notice
> and this permission notice appear in all copies.
>
> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
> REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
> FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
> INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
> OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
> TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
> THIS SOFTWARE.


## Collaboration

If you have questions or issues, please [open an issue][issue]!


[1]: https://github.com/ericclemmons/react-resolver/blob/v1/README.md
[2]: https://github.com/ericclemmons/react-resolver/blob/v2/README.md
[changelog]: https://github.com/ericclemmons/react-resolver/blob/master/CHANGELOG.md
[demo]: https://cdn.rawgit.com/ericclemmons/react-resolver/master/examples/stargazers/public/index.html
[issue]: https://github.com/ericclemmons/react-resolver/issues/new
[license]: https://github.com/ericclemmons/react-resolver/blob/master/LICENSE
[twitter]: https://twitter.com/ericclemmons/
[upcoming]: https://github.com/ericclemmons/react-resolver/blob/master/CHANGELOG.md#upcoming
