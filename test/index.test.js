import test from "tape";

import * as index from "../dist";

test("exports", function(t) {
  t.plan(1);

  const expected = [
    "client",
    "context",
    "resolve",
    "Resolver",
  ];

  t.deepEqual(Object.keys(index), expected, `Library exports ${expected}`);
});
