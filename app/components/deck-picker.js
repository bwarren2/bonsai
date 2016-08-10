import Ember from 'ember';

export default Ember.Component.extend({
  showAddDeck: false,
  deckTitle: '',

  actions: {
    setActiveDeck (deck) {
      this.sendAction("setActiveDeck", deck);
    },

    toggleAddDeck () {
      const showAddDeck = this.get('showAddDeck');
      this.set('showAddDeck', !showAddDeck);
    },

    addDeck () {
      const title = this.get('deckTitle');
      this.set('deckTitle', '');
      if (Boolean(title)) {
        const deck = this.get('store').createRecord('deck', { title });
        deck.save();
        this.set('activeDeck', deck);
        const showAddDeck = this.get('showAddDeck');
        this.set('showAddDeck', !showAddDeck);
      }
    }
  }
});
