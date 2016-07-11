import Ember from 'ember';

export default Ember.Controller.extend({
  highlightedTask: null,

  actions: {
    addBlocks: function (task) {
      const highlightedTask = this.get('highlightedTask');
      if (!highlightedTask) {
        this.set('highlightedTask', task);
      } else {
        this.get('highlightedTask').addBlocks(task);
        this.set('highlightedTask', null);
      }
    },
    clearBlocks: function (task) {
      task.clearBlocks();
    }
  }
});
