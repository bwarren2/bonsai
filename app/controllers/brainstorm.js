import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';

export default Ember.Controller.extend(FilteredTasks, {
  newTaskTitle: '',

  actions: {
    addTask () {
      const title = this.get('newTaskTitle');
      this.store.findRecord('deck', this.get('activeDeck.deck')).then((deck) => {
        this.set('newTaskTitle', '');
        if (title) {
          const attrs = {
            title,
            deck
          };
          this.store.createRecord('task', attrs).save();
        }
      });
    }
  }
});
