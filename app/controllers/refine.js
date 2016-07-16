import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    remove (task) {
      task.destroyRecord();
    },

    complete (task) {
      task.set('completed', true);
      task.save();
    }
  }
});
