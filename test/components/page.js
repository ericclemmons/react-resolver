var React     = require('react');
var Resolver  = require('../../');

var Content = require('./content');

var Page = React.createClass({
  mixins: [Resolver.mixin],

  statics: {
    resolve: {
      title: function() {
        return 'Welcome!';
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

        <Content body='body=""' />
        {/*<Content />*/}
      </body>
    );
  }
});

module.exports = Page;
