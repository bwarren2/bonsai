import Ember from 'ember';

export default Ember.Mixin.create({
  application: Ember.inject.controller(),
  session: Ember.inject.service(),

  activeDeck: Ember.computed.alias('application.activeDeck'),
  tasks: Ember.computed(
    'model.tasks.[]',
    'model.decks.[]',
    'model.tasks.@each.deck',
    'activeDeck',
    function () {
      const activeDeck = this.get('activeDeck');
      if (activeDeck) {
        return this.get('model.tasks').filter((task) => {
          return task.get('deck.id') === activeDeck.get('id');
        });
      }
      return this.get('model.tasks');
    }
  ),
  filteredTasks: Ember.computed.alias('tasks'),
  decks: Ember.computed.alias('model.decks'),

  actions: {
    setActiveDeck (deck) {
      this.set('activeDeck', deck);
    }
  }
});
