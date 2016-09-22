import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    complete (task) {
      task.complete();
    },

    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    }
  }
});
