import Ember from 'ember';

export default Ember.Mixin.create({
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
