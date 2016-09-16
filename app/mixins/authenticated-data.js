import Ember from 'ember';

export default Ember.Mixin.create({
  model () {
    const deckParams = {
      deleted_at: 'null'
    };
    const taskParams = {};
    if (this.get('session.isAuthenticated')) {
      return Ember.RSVP.hash({
        currentUser: this.get('session.currentUser'),
        decks: this.store.findAll('deck'), // query('deck', deckParams),
        tasks: this.store.findAll('task') // query('task', taskParams)
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
