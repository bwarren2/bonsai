import Ember from 'ember';

export default Ember.Mixin.create({
  application: Ember.inject.controller(),
  activeDeck: Ember.inject.service(),

  queryParams: {
    deck: 'activeDeck.deck'
  },

  filteredTasks: Ember.computed(
    'model.tasks.[]',
    'model.decks.[]',
    'model.tasks.@each.deck',
    'activeDeck.deck',
    function () {
      const deck = this.get('activeDeck.deck');
      if (deck) {
        return this.get('model.tasks').filter((task) => {
          return (
            task.get('deck.id') === deck && task.get("notCompleted")
          );
        });
      }
      return this.get('model.tasks').filter((task) => {
        return task.get("notCompleted");
      });
    }
  ),
  completedTasks: Ember.computed(
    'model.tasks.[]',
    'model.decks.[]',
    'model.tasks.@each.deck',
    'activeDeck.deck',
    function () {
      const deck = this.get('activeDeck.deck');
      if (deck) {
        return this.get('model.tasks').filter((task) => {
          return (
            task.get('deck.id') === deck && task.get("isCompleted")
          );
        });
      }
      return this.get('model.tasks').filter((task) => {
        return task.get("isCompleted");
      });
    }

  ),
  tasks: Ember.computed.alias('model.tasks'),
  decks: Ember.computed.alias('model.decks')
});
