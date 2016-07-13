import Ember from 'ember';

export default Ember.Controller.extend({
  highlightedTask: null,

  actions: {
    addBefore (task) {
      const highlightedTask = this.get('highlightedTask');
      if (!highlightedTask) {
        this.set('highlightedTask', task);
      } else {
        this.get('highlightedTask').addBefore(task);
        this.set('highlightedTask', null);
      }
    },

    clearBefores (task) {
      task.clearBefores();
    }
  }
});
