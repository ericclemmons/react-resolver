### `resolve`

Decorate your components with either `@resolve(prop, promiseFunc)` or
`@resolve({ prop: promiseFunc })`.

The difference is whether or not the props are fetched in parallel.

```js
// Parallel request to `user` and `repo`
@resolve({
  "user": ({ location: { query }, params }) => params.user || query.user),
  "repo": ({ location: { query }, params }) => params.repo || query.repo),
})
// `users` prop depends on `user` & `repo`
@resolve("users", function({ user, repo }) {
  const url = `https://api.github.com/repos/${user}/${repo}/stargazers`;

  return axios.get(url).then(({ data }) => data);
})
export default class Stargazers extends React.Component {
```
