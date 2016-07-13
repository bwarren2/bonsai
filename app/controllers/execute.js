import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    complete (task) {
      task.set('completed', true);
      task.save();
      // TODO: Take this task off the top, reveal the next one.
    }
  }
});
