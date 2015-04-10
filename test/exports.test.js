import assert from "assert";

import Container from "../src/Container";
import exported from "../src";
import Resolver from "../src/Resolver";
import ResolverError from "../src/ResolverError";

describe("exports", function() {
  it("should only specify `Class`, `Container`, & `Error`", function() {
    const keys = Object.keys(exported);

    assert.deepEqual(keys, ["Class", "Container", "Error"]);
  });

  describe(".Class", function() {
    it("should be `Resolver`", function() {
      assert(exported.Class);
      assert.equal(exported.Class, Resolver);
    });
  });

  describe(".Container", function() {
    it("should be `Container`", function() {
      assert(exported.Container);
      assert.equal(exported.Container, Container);
    });
  });

  describe(".Error", function() {
    it("should be `Error`", function() {
      assert(exported.Error);
      assert.equal(exported.Error, ResolverError);
    });
  });
});
