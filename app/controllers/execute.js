import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';

export default Ember.Controller.extend(FilteredTasks, {
  animationDuration: 4500,

  completeTask (task) {
    const duration = 3 * 1000;
    task.set('pendingCompletion', true);
    const destination = {
      top: 17,
      right: 40,
      scale: 0.3
    };
    const finalDestination = {
      right: -1000
    };

    const jqSelect = Ember.$('.task-card').filter(
      (idx, elem) => Ember.$(elem).data("task-id") == task.get("id")
    );
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
      task.set('pendingCompletion', false);
      task.complete();
    }, duration);
  },

  actions: {
    complete (task) {
      const animationDuration = this.get('animationDuration');
      // TODO throttling is the worst. We should queue all clicks to complete,
      // and only run the next one when the previous complete is, ahem,
      // complete. Even that introduces UI problems, though.
      Ember.run.throttle(this, this.completeTask, task, animationDuration);
    },

    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    }
  }
});
