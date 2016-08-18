import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';

export default Ember.Controller.extend(FilteredTasks, {
  showTimer: false,
  stalledTask: false,
  runningTask: null,

  sortedFilteredTasks: Ember.computed('filteredTasks.@each.readyForRefine', function () {
    return this.get('filteredTasks').sortBy('created_at:desc').filter((task) => {
      return task.get('readyForRefine');
    });
  }),

  activeTask: Ember.computed('sortedFilteredTasks', function () {
    return this.get('sortedFilteredTasks')[0];
  }),

  inactiveTasks: Ember.computed('sortedFilteredTasks', 'activeTask', function () {
    const tasks = this.get('sortedFilteredTasks');
    const activeTaskId = this.get('activeTask.id');
    let idx = tasks.findIndex((elem) => elem.get('id') === activeTaskId);
    if (idx < 0) {
      idx = 0;
      const newActiveTask = this.get('sortedFilteredTasks')[0];
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
      task.save();
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

    makeActive (task) {
      if (!this.get('runningTask')) {
        this.set("activeTask", task);
        this.set('task', null);
      }
    },

    changeDeck (task, deck) {
      task.set('deck', deck);
      task.save();
    }
  }
});
