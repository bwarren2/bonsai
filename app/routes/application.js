import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model () {
    if (this.get('session.isAuthenticated')) {
      return Ember.RSVP.hash({
        currentUser: this.get('session.currentUser'),
        decks: this.store.findAll('deck'),
        tasks: this.store.findAll('task')
      });
    } else {
      return Ember.RSVP.hash({
        currentUser: null,
        decks: [],
        tasks: []
      });
    }
  }
});
