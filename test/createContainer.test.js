import assert from "assert";
import React from "react";

import Fixture from "./support/Fixture";
import Resolver from "../src";

const { Container } = Resolver;

describe(".createContainer", function() {
  beforeEach(function() {
    this.TestContainer = Resolver.createContainer(Fixture);
  });

  it("should use same propTypes as Container", function() {
    assert.deepEqual(Container.propTypes, this.TestContainer.propTypes);
  });

  it("should set `displayName` to `[ComponentName]Container`", function() {
    assert(this.TestContainer.displayName, "FixtureContainer");
  });
});
