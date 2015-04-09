import PropsFixture from "./PropsFixture";
import Resolver from "../../src";

export default Resolver.createContainer(PropsFixture, {
  resolve: {
    user: () => "Eric",
  },
});
