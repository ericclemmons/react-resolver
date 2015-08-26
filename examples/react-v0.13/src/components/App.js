import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { RouteHandler } from "react-router";

export default class App extends React.Component {
  static displayName = "App"

  render() {
    return (
      <section className="blue-grey lighten-5">
        <Header />

        <main className="container">
          <RouteHandler />
        </main>

        <Footer />
      </section>
    );
  }
}
