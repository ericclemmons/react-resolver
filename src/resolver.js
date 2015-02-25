import _ from 'lodash';
import assign from 'react/lib/Object.assign';
import Bluebird from 'bluebird';
import React from 'react';
import mixin from './mixin';

import { Route, RouteHandler } from 'react-router';

export default class Resolver {
  static create(context) {
    return new Resolver(context);
  }

  constructor(context) {
    this.promises = {};
    this.renders = 0;
    this.context  = {};

    if (context) {
      assign(this.context, context, { resolver: this });
    }
  }

  route(routes) {
    let context = { resolver: this };

    let ResolverContext = React.createClass({
      childContextTypes: mixin.contextTypes,

      getChildContext: function() {
        return context;
      },

      render: function() {
        return <RouteHandler />;
      }
    });

    return (
      <Route handler={ResolverContext}>
        {routes}
      </Route>
    );
  }

  resolve(element) {
    React.renderToStaticMarkup(element);

    let pending = _.any(this.promises, (promise) => promise.isPending());

    // Because the first render is hidden, a minimum of 1 resolution is required
    if (pending || !this.renders++) {
      return Bluebird.props(this.promises).then(() => this.resolve(element));
    }

    return Bluebird.resolve(element);
  }

  handle(Component) {
    return this.resolve(<Component />);
  }
}
