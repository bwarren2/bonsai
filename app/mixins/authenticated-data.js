import Ember from 'ember';

export default Ember.Mixin.create({
  activeDeck: Ember.inject.service(),

  queryParams: {
    deck: {
      refreshModel: true,
      replace: true
    }
  },

  model (params) {
    const deckParams = {
      deck: params.deck,
      deleted_at: 'null'
    };
    return Ember.RSVP.hash({
      currentUser: this.get('session.currentUser'),
      decks: this.store.query('deck', deckParams),
      tasks: this.store.findAll('task')
    }).catch(() => {
      return Ember.RSVP.has({
        currentUser: null,
        decks: [],
        tasks: []
      });
    });
  }
});
