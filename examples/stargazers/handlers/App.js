import React from "react";
import { RouteHandler } from "react-router";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default class App extends React.Component {
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
