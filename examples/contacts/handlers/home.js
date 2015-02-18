var React     = require('react');
var request   = require('superagent');
var Link      = require('react-router').Link;
var Resolver  = require('../../../');

var Home = React.createClass({
  mixins: [Resolver.mixin],

  statics: {
    resolve: {
      contacts(done) {
        request.get('/api/contacts.json', function(response) {
          response.ok ? done(null, response.body) : done(response);
        });
      }
    }
  },

  render() {
    return (
      <section className="container">
        <h1>Welcome!</h1>

        <ul>
          {this.props.contacts.map(contact =>
            <li>
              <Link to="contact" params={{ contactId: contact._id }}>
                {contact.name}
              </Link>
            </li>
          )}
        </ul>
      </section>
    );
  }
});

module.exports = Home;
