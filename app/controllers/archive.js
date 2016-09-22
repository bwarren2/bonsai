import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
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
