import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  beforeModel () {
    if (this.get('session').get('isAuthenticated')) {
      this.transitionTo('brainstorm');
    } else {
      this.transitionTo('splash');
    }
  }
});
