import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model () {
    return Ember.RSVP.hash({
      currentUser: this.get('session').get('currentUser'),
      decks: this.store.findAll('deck'),
      tasks: this.store.findAll('task')
    });
  }
});
