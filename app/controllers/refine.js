import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  animationDuration: 4500,

  showTimer: false,
  stalledTask: false,
  runningTask: null,

  sortedTasks: Ember.computed('model.tasks.@each.readyForRefine', function () {
    return this.get('model.tasks').sortBy('created_at:desc').filter((task) => {
      return task.get('readyForRefine');
    });
  }),

  activeTask: Ember.computed('sortedTasks', function () {
    return this.get('sortedTasks')[0];
  }),

  inactiveTasks: Ember.computed('sortedTasks', 'activeTask', function () {
    const tasks = this.get('sortedTasks');
    const activeTaskId = this.get('activeTask.id');
    let idx = tasks.findIndex((elem) => elem.get('id') === activeTaskId);
    if (idx < 0) {
      idx = 0;
      const newActiveTask = this.get('sortedTasks')[0];
      this.set('activeTask', newActiveTask);
    }
    return [
      ...tasks.slice(0, idx),
      ...tasks.slice(idx + 1)
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
    },

    done (task) {
      task.complete();
      task.set('refined', true);
    },

    destroy (task) {
      task.destroyRecord();
    },

    saveDetails () {
      const task = this.get('activeTask');
      if (task) {
        task.save();
      }
    },

    saveTitle () {
      const task = this.get('activeTask');
      if (task) {
        task.save();
      }
    },

    makeActive (task) {
      if (!this.get('runningTask')) {
        this.set("activeTask", task);
        this.set('task', null);
      }
    }
  }
});
