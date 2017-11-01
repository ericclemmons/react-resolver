# React Resolver Changelog

### v3.1.0 - (2016-11-23)
- Call resolvers even if property was already passed from the top component
  + <https://github.com/ericclemmons/react-resolver/pull/121>
  + <https://github.com/ericclemmons/react-resolver/issues/119>

### v3.0.3 - (2016-08-01)
- Fix promise duplication
  + <https://github.com/ericclemmons/react-resolver/pull/117>
  + <https://github.com/ericclemmons/react-resolver/issues/116>

### v3.0.2 - (2016-06-30)

- Fix `@client()` not showing the loader.
  + <https://github.com/ericclemmons/react-resolver/pull/39>

### v3.0.1 - (2016-04-11)

- Add support for React v15
  + <https://github.com/ericclemmons/react-resolver/pull/112>

### v3.0.0 - (2016-03-01)

- Require React, React-DOM v0.14
  + <https://github.com/ericclemmons/react-resolver/pull/100>

### v2.0.5 - (2015-09-07)

- Fix React Router v0.13.3 `HistoryLocation` bug
  + <https://github.com/ericclemmons/react-resolver/pull/78>
  + <https://github.com/ericclemmons/react-resolver/issues/75>


### v2.0.4 - (2015-08-25)

- Support _thenables_
  + <https://github.com/ericclemmons/react-resolver/pull/65>


### v2.0.3 - (2015-08-19)

- Fix integration React Router's `HistoryLocation`
  + <https://github.com/ericclemmons/react-resolver/pull/67>


### v2.0.2 - (2015-08-11)

- Apparently releasing `v1.3.0` takes over all of the `v2` releases?


### v2.0.1 - (2015-08-09)

- [Replace `Symbol` usage with plain strings](https://github.com/ericclemmons/react-resolver/issues/58)


### v2.0.0 - (2015-08-09)

- [V2 Rewrite](https://github.com/ericclemmons/react-resolver/pull/52)
- [Bootstrapping Client](https://github.com/ericclemmons/react-resolver/issues/22)
  + <https://github.com/ericclemmons/react-resolver/pull/34>
- [Owner/Parent Differ](https://github.com/ericclemmons/react-resolver/issues/29)


### v1.2.2 - (2015-08-05)

- [Decorators](https://github.com/ericclemmons/react-resolver/pull/31)


### v1.2.1 - (2015-08-05)

- [Add tests & correct props cascading](https://github.com/ericclemmons/react-resolver/pull/48)


### v1.2.0 - (2015-08-05)

- [Props cascade down to target component](https://github.com/ericclemmons/react-resolver/pull/56)


### v1.1.7 - (2015-04-25)

- [Clear Nested States](https://github.com/ericclemmons/react-resolver/pull/37)


### v1.1.6 - (2015-04-25)

- [Clear Cache After Render](https://github.com/ericclemmons/react-resolver/issues/33)
  + Fix [Not resolving again when transitioning to sibling state](https://github.com/ericclemmons/react-resolver/issues/17)


### v1.1.5 - (2015-04-25)

- Update `dist/` from `v1.1.4`


### v1.1.4 - (2015-04-25)

- [require react/lib/cloneWithProps directly instead of through addons](https://github.com/ericclemmons/react-resolver/pull/32)
  + [Browserify Bundling Twice](https://github.com/ericclemmons/react-resolver/issues/27)


### v1.1.3 - (2015-04-15)

- [#28](https://github.com/ericclemmons/react-resolver/issues/28)
  _Another_ attempt to fix `Resolver` being named `resolver.js`


### v1.1.2 - (2015-04-15)

- [#28](https://github.com/ericclemmons/react-resolver/issues/28)
  Attempt to fix `Resolver` being named `resolver.js`


### v1.1.1 - (2015-04-13)

- Ignore more files via NPM (6c6fb03)


### v1.1.0 - (2015-04-13)

- [Contexts](https://github.com/ericclemmons/react-resolver/pull/21)


### v1.0.0 - (2015-04-13)

- Complete rewrite for React v0.13
- "Higher-order Components" via `Resolver.createContainer`
- Remove all dependencies (!)
  + [#9](https://github.com/ericclemmons/react-resolver/issues/9)
  + [#14](https://github.com/ericclemmons/react-resolver/issues/14)
  + [#15](https://github.com/ericclemmons/react-resolver/issues/15)


### v0.2.0 - (2015-02-25)

- Remove [`resolver.handle`][11]


### v0.1.2 (2015-02-25)

- Fix [examples/contacts](https://github.com/ericclemmons/react-resolver/tree/e026a3b1cbf16995c10c825c18d2f20b6277f62f/examples/contacts)


### v0.1.1 (2015-02-25)

- Move `react-router` from `optionalDependencies` to `peerDependencies`


### v0.1.0 (2015-02-24)

- [#7][7] - Add `react` and `react-router` as `peerDependencies`.
- [#8][8] - Support React v0.13


### v0.0.4 (2015-02-24)

- [#4][4] - NPM package is ES5, not ES6.
- [#5][5] - Clarify use of `Resolver.mixin`.
- [#6][6] - README comparison to Relay.


### v0.0.3 (2015-02-19)

- Public release


### v0.0.2 (2015-02-18)

- Working prototype with context


### v0.0.1 (2015-01-29)

- Initial commit


[4]: https://github.com/ericclemmons/react-resolver/pull/4
[5]: https://github.com/ericclemmons/react-resolver/issues/5
[6]: https://github.com/ericclemmons/react-resolver/issues/6
[7]: https://github.com/ericclemmons/react-resolver/issues/7
[8]: https://github.com/ericclemmons/react-resolver/issues/8
[11]: https://github.com/ericclemmons/react-resolver/issues/11
