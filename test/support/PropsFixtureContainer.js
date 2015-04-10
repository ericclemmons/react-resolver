import PropsFixture from "./PropsFixture";
import Resolver from "../../src/Resolver";

export default Resolver.createContainer(PropsFixture, {
  resolve: {
    user: () => "Eric",
  },
});
