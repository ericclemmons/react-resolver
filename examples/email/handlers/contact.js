var _         = require('lodash');
var Bluebird  = require('bluebird');
var React     = require('react');
var request   = require('superagent');
var Resolver  = require('../../../');
var Router    = require('react-router');

var { Link } = Router;

var Contact = React.createClass({
  mixins: [Resolver.mixin, Router.State],

  statics: {
    resolve: {
      contact(done) {
        var contactId = this.getParams().contactId;

        request.get('/api/contacts.json', function(response) {
          if (!response.ok) {
            done(response);
          }

          var contact = _.find(response.body, { _id: contactId });

          done(null, contact);
        });
      }
    }
  },

  render() {
    return (
      <section className="container">
        <ol className="breadcrumb">
          <li><Link to="home">Home</Link></li>
          <li className="active">Contact</li>
        </ol>

        <div className="thumbnail">
          <div className="media">
            <div className="media-left">
              <img className="media-object" src={this.props.contact.picture} />
            </div>
            <div className="media-body">
              <h4 className="media-heading">
                {this.props.contact.name}
              </h4>
              <p>
                {this.props.contact.company}
              </p>
            </div>
            <p>
              {this.props.contact.about}
            </p>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Contact;
