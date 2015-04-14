import assert from "assert";
import React from "react";
import { Resolver } from "../dist";

import Fixture from "./support/Fixture";
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

    context("when resolving values", function() {
      describe("props", function() {
        beforeEach(function() {
          this.Spy = Resolver.createContainer(Fixture, {
            resolve: { test: (props) => this.actual = props },
          });
        });

        it("should not include internal props", function(done) {
          Resolver
            .renderToStaticMarkup(<this.Spy />)
            .then((markup) => {
              assert.deepEqual(this.actual, []);
              done();
            }).catch(done)
          ;
        });

        it("should include external props", function(done) {
          Resolver
            .renderToStaticMarkup(<this.Spy foo="bar" />)
            .then((markup) => {
              assert.deepEqual(this.actual, { foo: "bar" });
              done();
            }).catch(done)
          ;
        });
      });

      describe("context", function() {
        beforeEach(function() {
          this.Spy = Resolver.createContainer(Fixture, {
            contextTypes: { foo: React.PropTypes.any },
            resolve: { test: (props, context) => this.actual = context },
          });
        });

        it("should not include internal context", function(done) {
          Resolver
            .renderToStaticMarkup(<this.Spy />)
            .then((markup) => {
              assert.deepEqual(this.actual, { foo: undefined });
              done();
            }).catch(done)
          ;
        });

        it("should include external context", function(done) {
          class Context extends React.Component {
            getChildContext() {
              return { foo: "bar" };
            }

            render() {
              return <this.props.component />;
            }
          }

          Context.childContextTypes = { foo: React.PropTypes.any };
          Context.displayName = "Context";

          Resolver
            .renderToStaticMarkup(<Context component={this.Spy} />)
            .then((markup) => {
              assert.deepEqual(this.actual, { foo: "bar" });
              done();
            }).catch(done)
          ;
        });
      });
    });
  });
});
