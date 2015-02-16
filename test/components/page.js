var Bluebird  = require('bluebird');
var React     = require('react');
var Resolver  = require('../../');

var Content = require('./content');

var Page = React.createClass({
  mixins: [Resolver.mixin],

  statics: {
    resolve: {
      title: function() {
        return new Bluebird(function(resolve) {
          setTimeout(function() {
            resolve('Welcome!');
          }, 1000);
        });
      }
    },
  },

  getDefaultProps: function() {
    return {
      title: 'Page',
    }
  },

  render: function() {
    return (
      <body>
        <h1>{this.props.title}</h1>

        <Content body='body' />
        <Content />

        <section>
          <Content body='body2' />
          <Content />
        </section>
      </body>
    );
  }
});

module.exports = Page;
