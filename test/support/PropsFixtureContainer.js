import PropsFixture from "./PropsFixture";
import { Resolver } from "../../dist";

export default Resolver.createContainer(PropsFixture, {
  resolve: {
    user: () => "Eric",
  },
});
