import Ember from 'ember';

export default Ember.Controller.extend({
  showTimer: false,
  stalledTask: false,
  runningTask: null,

  sortedFilteredModel: Ember.computed('model.@each.readyForRefine', function () {
    return this.get('model').sortBy('created:desc').filter((task) => {
      return task.get('readyForRefine');
    });
  }),

  activeTask: Ember.computed('sortedFilteredModel', function () {
    return this.get('sortedFilteredModel')[0];
  }),

  inactiveTasks: Ember.computed('sortedFilteredModel', 'activeTask', function () {
    const models = this.get('sortedFilteredModel');
    const activeTask = this.get('activeTask');
    let idx = models.findIndex((elem) => elem.get('id') === activeTask.get('id'));
    if (idx < 0) {
      idx = 0;
      const newActiveTask = this.get('sortedFilteredModel')[0];
      this.set('activeTask', newActiveTask);
    }
    return [
      ...models.slice(0, idx),
      ...models.slice(idx + 1)
    ];
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
    },

    saveDetails () {
      const task = this.get('activeTask');
      if (Boolean(task)) {
        task.save();
      }
    },

    makeActive (task) {
      if (!Boolean(this.get('runningTask'))) {
        this.set("activeTask", task);
        this.set('task', null);
      }
    }
  }
});
