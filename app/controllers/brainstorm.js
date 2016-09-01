import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';

export default Ember.Controller.extend(FilteredTasks, {
  newTaskTitle: '',

  actions: {
    addTask () {
      const title = this.get('newTaskTitle');
      const deck = this.get('activeDeck.deck');
      this.set('newTaskTitle', '');
      if (title) {
        const attrs = {
          title,
          deck
        };
        this.store.createRecord('task', attrs).save();
      }
    }
  }
});
