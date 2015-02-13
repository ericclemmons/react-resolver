var React     = require('react');
var Resolver  = require('../../');


var Content = React.createClass({
  mixins: [Resolver.mixin],

  statics: {
    resolve: {
      body: function() {
        return 'Howdy!';
      }
    }
  },

  getDefaultProps: function() {
    return {
      title: 'Content',
    }
  },

  render: function() {
    return <p>{this.props.body}</p>
  }
});

module.exports = Content;
