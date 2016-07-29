import Ember from 'ember';

export default Ember.Controller.extend({
  showTimer: false,
  runningTask: null,

  sortedFilteredModel: Ember.computed('model.@each.refined', function () {
    return this.get('model').sortBy('created:desc').filter((task) => {
      return !task.get('refined');
    });
  }),

  activeTask: Ember.computed('sortedFilteredModel', function () {
    return this.get('sortedFilteredModel')[0];
  }),

  inactiveTasks: Ember.computed('sortedFilteredModel', function () {
    return this.get('sortedFilteredModel').slice(1);
  }),

  actions: {
    do (task) {
      this.set('showTimer', true);
      this.set('runningTask', task);
      // Delegate further activity to the countdown-timer component.
    },

    timerDone () {
      // Pick up activity from the countdown-timer component.
      const task = this.get('runningTask');
      this.set('showTimer', false);
      task.set('refined', true);
      task.save();
    },

    defer (task) {
      task.set('refined', true);
      task.save();
    },

    destroy (task) {
      task.destroyRecord();
    }
  }
});
