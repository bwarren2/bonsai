import Ember from 'ember';

export function activeDeck(params) {
  const deck = params[0];
  const activeDeck = params[1];

  return deck === activeDeck ? 'active' : '';
}

export default Ember.Helper.helper(activeDeck);
