import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    reject (task) {
      task.set('completed', false);
      task.save();
    },

    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    }
  }
});
