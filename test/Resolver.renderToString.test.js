import assert from "assert";
import React from "react";
import { Container, Resolver } from "../dist";

import PropsFixture from "./support/PropsFixture";
import PropsFixtureContainer from "./support/PropsFixtureContainer";

describe("Resolver", function() {
  describe(".renderToString", function() {
    it("should not fail", function(done) {
      const expected = React.renderToString(<PropsFixture user="eric" />);

      Resolver.renderToString(<PropsFixtureContainer />).then((string) => {
        assert(string);

        done();
      }).catch(done);
    });
  });
});
