var Bluebird  = require('bluebird');
var React     = require('react');
var Resolver  = require('../../');


var Content = React.createClass({
  mixins: [Resolver.mixin],

  statics: {
    resolve: {
      body: function() {
        return new Bluebird(function(resolve) {
          setTimeout(function() {
            resolve('Howdy!');
          }, 1000);
        });

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
