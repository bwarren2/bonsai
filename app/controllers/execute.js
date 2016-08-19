import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';

export default Ember.Controller.extend(FilteredTasks, {
  actions: {
    complete (task) {
      const duration = 3000;
      task.set('pendingCompletion', true);
      const destination = {
        // These values seems unreasonably large, but they are affected by the
        // scaling, so they are reasonable!
        top: 500,
        right: -900,
        scale: 0.1
      };

      const jqSelect = Ember.$('.task-card').filter(
        (idx, elem) => Ember.$(elem).data("task-id") == task.get("id")
      );

      d4.select(jqSelect.get(0))
        .style('position', 'relative')
        .transition()
        .duration(2000)
        .style('right', `${destination.right}px`)
        .style('top', `${destination.top}px`)
        .style('transform', `scale(${destination.scale})`)
        .transition()
        .duration(duration);

      // Run later to allow animation to complete.
      Ember.run.later(this, () => {
        task.set('pendingCompletion', false);
        task.complete();
      }, duration);
    },

    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    }
  }
});
