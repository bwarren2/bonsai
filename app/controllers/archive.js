import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';

export default Ember.Controller.extend(FilteredTasks, {
  queryParams: ['s'],
  s: '',

  actions: {
    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    },

    search () {
      // Search happens in real-time as the `s` attribute is updated. Don't
      // need to do anything here. But we have this action to suppress form
      // submission events.
      return false;
    }
  }
});
