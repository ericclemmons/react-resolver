import PropsFixture from "./PropsFixture";
import { Resolver } from "../../dist";

export default Resolver.createContainer(PropsFixture, {
  resolve: {
    user: () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve("Eric"), 0);
      });
    },
  },
});
