import assert from "assert";
import { Container } from "../dist";
import React from "react";

import Fixture from "./support/Fixture";

describe("Container", function() {
  describe(".childContextTypes", function() {
    it("should only specify `parent` & `resolver`", function() {
      const keys = Object.keys(Container.childContextTypes);

      assert.deepEqual(keys, ["parent", "resolver"]);
    });

    describe(".parent", function() {
      it("should be `React.PropTypes.instanceOf(Container)`", function() {
        const declaration = Container.childContextTypes.parent;
        const context = { parent: <Fixture /> };
        const error = declaration(context, "parent", "Container", "childContext");

        assert(error instanceof Error);
        assert.equal(error.message, "Invalid child context `parent` supplied to `Container`, expected instance of `Container`.");
      });
    });

    describe(".resolver", function() {
      it("should be `React.PropTypes.object`", function() {
        assert.equal(Container.childContextTypes.resolver, React.PropTypes.object.isRequired);
      });
    });
  });

  describe(".contextTypes", function() {
    it("should only specify `resolver`", function() {
      const keys = Object.keys(Container.contextTypes);

      assert.deepEqual(keys, ["resolver"]);
    });

    describe(".resolver", function() {
      it("should be `React.PropTypes.object`", function() {
        assert.equal(Container.contextTypes.resolver, React.PropTypes.object);
      });
    });
  });

  describe(".displayName", function() {
    it("should be `ResolverContainer`", function() {
      assert.equal(Container.displayName, "ResolverContainer");
    });
  });

  describe(".propTypes", function() {
    it("should only specify `component`, `element`, `resolve` & `resolver`", function() {
      const keys = Object.keys(Container.propTypes);

      assert.deepEqual(keys, ["component", "element", "resolve", "resolver"]);
    });

    describe(".component", function() {
      it("should be `React.PropTypes.any`", function() {
        assert.equal(Container.propTypes.component, React.PropTypes.any);
      });
    });

    describe(".element", function() {
      it("should be `React.PropTypes.element`", function() {
        assert.equal(Container.propTypes.element, React.PropTypes.element);
      });
    });

    describe(".resolve", function() {
      it("should be `React.PropTypes.object`", function() {
        assert.equal(Container.propTypes.resolve, React.PropTypes.object);
      });
    });

    describe(".resolver", function() {
      it("should be `React.PropTypes.object`", function() {
        assert.equal(Container.propTypes.resolver, React.PropTypes.object);
      });
    });
  });
});
