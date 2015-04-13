import React from "react";

import Stargazers from "../components/Stargazers";

export default class Home extends React.Component {
  render() {
    return (
      <Stargazers user="ericclemmons" repo="react-resolver" />
    );
  }
}
