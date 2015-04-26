import assert from "assert";
import cloneWithProps from "react/lib/cloneWithProps";
import { Container, Resolver } from "../dist";
import React from "react";

import PropsFixtureContainer from "./support/PropsFixtureContainer";

describe("<Container />", function() {
  beforeEach(function() {
    let counter = 0;

    this.node = document.createElement("div");
    this.resolver = new Resolver();
    this.resolve = { counter: function() { return ++counter; } };
    this.element = (
      <Container resolve={this.resolve} resolver={this.resolver}>
        <PropsFixtureContainer />
      </Container>
    );
  });

  describe("constructor", function() {
    it("should not resolve yet", function() {
      assert(this.element, "Element should be instantiated");
      assert.deepEqual(this.resolver.states, {});
    });
  });

  describe("Lifecycle", function() {
    beforeEach(function(done) {
      this.rendered = React.render(this.element, this.node, done);
    });

    afterEach(function() {
      React.unmountComponentAtNode(this.node);
    });

    describe(".componentWillMount", function() {
      it("should resolve", function() {
        const id = Object.keys(this.resolver.states).shift();

        assert(this.resolver.states[id], "State should be set");
        assert(this.resolver.states[id].fulfilled, "State should be fulfilled");
        assert.deepEqual(this.resolver.states[id].values, { counter: 1 });
      });
    });

    describe(".componentWillReceiveProps", function() {
      it("should reset existing state", function() {
        const id = Object.keys(this.resolver.states).shift();
        const state = this.rendered.state;
        const updated = cloneWithProps(this.element, { another: "prop" });

        assert(this.rendered.state.fulfilled);

        React.render(updated, this.node);

        assert.notEqual(this.rendered.state, state);
        assert(!this.rendered.state.fulfilled);
      });

      it("should reset child states", function() {
        const last = Object.keys(this.resolver.states).pop();
        const updated = cloneWithProps(this.element, { another: "prop" });

        assert(this.rendered.state.fulfilled);

        React.render(updated, this.node);

        assert.equal(this.resolver.states[last], undefined);
      });
    });

    describe(".componentWillUnmount", function() {
      it("should remove existing state", function() {
        const id = Object.keys(this.resolver.states).shift();

        assert(this.resolver.states[id]);
        assert(React.unmountComponentAtNode(this.node), "Element was not mounted");
        assert.equal(this.resolver.states[id], undefined, "Element state should be been removed.");
      });
    })
  });
});
