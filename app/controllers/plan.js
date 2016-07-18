import Ember from 'ember';

export default Ember.Controller.extend({
  taskGraphData: Ember.computed('model.@each.title', 'model.@each.afters', function () {
    return this.get('model');
  }),

  actions: {
    clearDependencies () {
      this.get('model').forEach((task) => {
        task.clearBefores();  // This will clear reciprocal relationships too.
      });
    },

    addAfter (taskId, targetId) {
      const task = this.get('model').findBy('id', taskId);
      const target = this.get('model').findBy('id', targetId);
      task.addAfter(target);
    }
  }
});
