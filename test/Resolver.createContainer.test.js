import assert from "assert";
import React from "react";

import Resolver from "../src";

const { Container } = Resolver;

class Fixture extends React.Component {}

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
