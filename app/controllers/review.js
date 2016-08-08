import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    reject (task) {
      task.uncomplete();
    },

    approve (task) {
      task.approve();
    },

    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    }
  }
});
