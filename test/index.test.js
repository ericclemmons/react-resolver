import * as index from "..";
import assert from "assert";

describe("Resolver", function() {
  describe("exports", function() {
    const expected = [
      "client",
      "context",
      "resolve",
      "resolveError",
      "Resolver",
    ];

    it(`should export ${expected}`, function() {
      assert.deepEqual(Object.keys(index), expected);
    });
  });
});
