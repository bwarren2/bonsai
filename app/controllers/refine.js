import Ember from 'ember';

export default Ember.Controller.extend({
  showTimer: false,
  stalledTask: false,
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

    timerDone (stalled) {
      if (stalled) {
        this.set('stalledTask', true);
      } else {
        this.set('showTimer', false);
      }
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
