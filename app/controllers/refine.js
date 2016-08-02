import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['task'],
  task: null,

  showTimer: false,
  stalledTask: false,
  runningTask: null,

  sortedFilteredModel: Ember.computed('model.@each.readyForRefine', function () {
    return this.get('model').sortBy('created:desc').filter((task) => {
      return task.get('readyForRefine');
    });
  }),

  activeTask: Ember.computed('sortedFilteredModel', function () {
    const models = this.get('sortedFilteredModel');
    // TODO: this would ideally happen in an onRender handler of some sort, so
    // that it will update each time the route is accessed. Currently, if you
    // select a task in Refine, and then go back to Brainstorm and select a
    // different task, it won't update.
    if (Boolean(this.get('task'))) {
      const taskId = this.get('task');
      const task = models.find((elem) => elem.get('id') === taskId);
      this.set('task', null);
      return task;
    }
    return models[0];
  }),

  inactiveTasks: Ember.computed('sortedFilteredModel', 'activeTask', function () {
    const models = this.get('sortedFilteredModel');
    const activeTask = this.get('activeTask');
    const idx = models.findIndex((elem) => elem.get('id') === activeTask.get('id'));
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
