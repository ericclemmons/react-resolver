import assert from "assert";
import { Container } from "../dist";
import React from "react";

import FixtureContainer from "./support/FixtureContainer";

describe("Resolver", function() {
  describe(".createContainer", function() {
    describe(".displayName", function() {
      it("should be `${ComponentName}Container`", function() {
        assert.equal(FixtureContainer.displayName, "FixtureContainer");
      });
    });

    describe(".childContextTypes", function() {
      it("should not have any", function() {
        assert.equal(FixtureContainer.childContextTypes, undefined);
      });
    });

    describe(".contextTypes", function() {
      it("should not have any", function() {
        assert.equal(FixtureContainer.contextTypes, undefined);
      });
    });

    describe(".propTypes", function() {
      it("should not have any", function() {
        assert.equal(FixtureContainer.propTypes, undefined);
      });
    });
  });
});
