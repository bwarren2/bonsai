import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';

export default Ember.Controller.extend(FilteredTasks, {
  actions: {
    rename(deck, name) {
      deck.title = name;
      deck.save();
    },
    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    },
    delete (deck) {
      deck.delete();
    }
  }
});
