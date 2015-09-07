import React from "react";

import { resolveError } from "react-resolver";
import { RouteHandler } from "react-router";

import Footer from "../components/Footer";
import Header from "../components/Header";
import PrettyError from "../components/PrettyError";


@resolveError()
export default class App extends React.Component {
  static displayName = "App"

  render() {
    const { error } = this.props;

    return (
      <section className="blue-grey lighten-5">
        <Header />

        <main className="container">
          {error ? <PrettyError error={error} /> : <RouteHandler />}
        </main>

        <Footer />
      </section>
    );
  }
}
