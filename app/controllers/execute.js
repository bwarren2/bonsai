import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';

export default Ember.Controller.extend(FilteredTasks, {
  actions: {
    complete (task) {
      task.set('pendingCompletion', true);
      // Run later to allow animation to complete.
      Ember.run.later(this, () => {
        task.set('pendingCompletion', false);
        task.complete();
      }, 500);
    },

    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    }
  }
});
