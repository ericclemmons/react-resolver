import React from "react";
import test from "tape";

import { resolve, Resolver } from "..";

@resolve({
  "promise": () => Promise.resolve("promise"),
  "scalar": () => "scalar",
  "thenable": () => ({
    then: () => "thenable",
  }),
})
@resolve("test", ({ test }) => test)
class PropTest extends React.Component {
  displayName = "PropTest"

  render() {
    const { promise, scalar, test, thenable } = this.props;

    test.equal(promise, "promise", "Promise should solve to scalar");
    test.equal(scalar, "scalar", "Scalar should resolve to scalar");
    test.equal(thenable, "thenable", "Thenable should resolve to scalar");
    test.end();

    return null;
  }
}

test("@resolve", function(t) {
  t.test("resolves promises", function(t) {
    t.plan(3);

    Resolver.resolve(() => <PropTest test={t} />).catch(t.end);
  });
});
