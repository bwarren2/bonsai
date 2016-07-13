import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    clearBefores (task) {
      task.clearBefores();
    },

    addBefore (taskId, target) {
      const task = this.get('model').findBy('id', taskId);
      target.addBefore(task);
    },

    addAfter (taskId, target) {
      const task = this.get('model').findBy('id', taskId);
      target.addAfter(task);
    }
  }
});
