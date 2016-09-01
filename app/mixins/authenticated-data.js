import Ember from 'ember';

export default Ember.Mixin.create({
  model () {
    const deckParams = {
      deleted_at: 'null'
    };
    const taskParams = {};
    return Ember.RSVP.hash({
      currentUser: this.get('session.currentUser'),
      decks: this.store.query('deck', deckParams),
      tasks: this.store.query('task', taskParams)
    }).catch(() => {
      return Ember.RSVP.has({
        currentUser: null,
        decks: [],
        tasks: []
      });
    });
  }
});
