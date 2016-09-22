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

  animateTaskAway (task, action) {
    const duration = 3 * 1000;
    const destination = {
      top: -33,
      right: 40,
      scale: 0.3
    };
    const finalDestination = {
      right: -900
    };

    const jqSelect = Ember.$('.action-area .task-card');
    const initialWidth = jqSelect.outerWidth();
    const initialHeight = jqSelect.outerHeight();
    jqSelect.css({
      'width': initialWidth,
      'height': initialHeight
    });

    d4.select(jqSelect.get(0))
      .style('position', 'fixed')
      .transition()
      .duration(1500)
      .style('right', `${destination.right}px`)
      .style('top', `${destination.top}px`)
      .style('transform-origin', 'right')
      .style('transform', `scale(${destination.scale})`)
      .transition()
      .duration(duration)
      .style('right', `${finalDestination.right}px`)
    ;

    // Run later to allow animation to complete.
    Ember.run.later(this, () => {
      jqSelect.css({
        'position': '',
        'top': '',
        'right': '',
        'transform': '',
        'transform-origin': '',
        'width': '',
        'height': ''
      });
      switch (action) {
        case 'complete':
          task.complete();
          task.set('refined', true);
          break;
        case 'refine':
          task.set('refined', true);
          break;
        default:
          break;
      }
      task.save();
    }, duration);
  },

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
      this.animateTaskAway(task, 'refine');
    },

    done (task) {
      this.animateTaskAway(task, 'complete');
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
