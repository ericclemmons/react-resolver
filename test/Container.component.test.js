import assert from "assert";
import React from "react";

import Container from "../src/Container";

describe("Container", function() {
  describe(".childContextTypes", function() {
    it("should only specify `resolver`", function() {
      const keys = Object.keys(Container.childContextTypes);

      assert.deepEqual(keys, ["resolver"]);
    });

    describe(".resolver", function() {
      it("should be `React.PropTypes.object`", function() {
        assert.equal(Container.childContextTypes.resolver, React.PropTypes.object);
      });
    });
  });

  describe(".contextTypes", function() {
    it("should only specify `id` & `resolver`", function() {
      const keys = Object.keys(Container.contextTypes);

      assert.deepEqual(keys, ["id", "resolver"]);
    });

    describe(".id", function() {
      it("should be `React.PropTypes.string`", function() {
        assert.equal(Container.contextTypes.id, React.PropTypes.string);
      });
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
