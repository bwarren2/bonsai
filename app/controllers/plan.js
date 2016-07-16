import Ember from 'ember';

export default Ember.Controller.extend({
  taskGraphData: Ember.computed('model.@each.title', 'model.@each.afters', function () {
    return this.get('model');
  }),

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
