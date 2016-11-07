### Decorate Components with Data

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

export default resolve("user", function(props) {
  ...
})(Stargazer);
```

[decorators]: https://github.com/wycats/javascript-decorators
[router]: https://github.com/rackt/react-router/
