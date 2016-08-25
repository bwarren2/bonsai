import Ember from 'ember';

export default Ember.Mixin.create({
  application: Ember.inject.controller(),
  session: Ember.inject.service(),

  activeDeck: Ember.computed.alias('application.activeDeck'),
  filteredTasks: Ember.computed(
    'model.tasks.[]',
    'model.decks.[]',
    'model.tasks.@each.deck',
    'activeDeck',
    function () {
      const activeDeck = this.get('activeDeck');
      if (activeDeck) {
        return this.get('model.tasks').filter((task) => {
          return (
            task.get('deck.id') === activeDeck.get('id')
              && task.get("notCompleted")
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
    'activeDeck',
    function () {
      const activeDeck = this.get('activeDeck');
      if (activeDeck) {
        return this.get('model.tasks').filter((task) => {
          return (
            task.get('deck.id') === activeDeck.get('id')
              && task.get("isCompleted")
          );
        });
      }
      return this.get('model.tasks').filter((task) => {
        return task.get("isCompleted");
      });
    }

  ),
  tasks: Ember.computed.alias('model.tasks'),
  decks: Ember.computed.alias('model.decks'),

  actions: {
    setActiveDeck (deck) {
      this.set('activeDeck', deck);
    }
  }
});
