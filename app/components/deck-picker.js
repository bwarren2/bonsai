import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  showAddDeck: false,
  deckTitle: '',

  hideAddDeck: Ember.on('focusOut', function () {
    if (this.get('showAddDeck')) {
      Ember.run.later(this, () => {
        const focussedElement = document.activeElement;
        const isFocussedOut = (
          this.$().has(focussedElement).length === 0 && !this.$().is(focussedElement)
        );

        if (isFocussedOut) {
          this.set('showAddDeck', false);
        }
      }, 0);
    }
  }),

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
      }
    }
  }
});
