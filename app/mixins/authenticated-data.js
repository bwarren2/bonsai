import Ember from 'ember';

export default Ember.Mixin.create({
  // activeDeck: Ember.inject.service(),
  // deck: Ember.computed.alias('activeDeck.deck'),

  queryParams: {
    deck: {
      refreshModel: true
    }
  },

  model (params) {
    const deckParams = {
      deleted_at: 'null'
    };
    const taskParams = {
      deck: params.deck
    };
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
