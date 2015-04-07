import Fixture from "./Fixture";
import Resolver from "../../src";

export default Resolver.createContainer(Fixture, {
  resolve: {
    user: function() {
      return "Eric Clemmons";
    },
  },
});
