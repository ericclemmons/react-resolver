### `client`

Use `@client(LoaderComponent)` (or `client(LoaderComponent)(YourComponent)`)
for when you want to skip server-side rendering of part of your view
and perform it only on the client.

This is ideal for things like:

- Long-running requests.
- 3rd Party Scripts.

```js
import { client, resolve } from "react-resolver";

// What sort of loader you render is up to you!
import Loader from "./Loader";

// This will show a loader until `user` resolves
@client(Loader)
@resolve("user", function(props) {
  return axios
    .get(`https://api.github.com/users/${props.params.user}`)
    .then((response) => response.data)
  ;
})
export default class Stargazer extends React.Component {
```
