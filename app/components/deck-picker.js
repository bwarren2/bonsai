import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    setActiveDeck (deck) {
      this.sendAction("setActiveDeck", deck);
    }
  }
});
