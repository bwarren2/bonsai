import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';

export default Ember.Controller.extend(FilteredTasks, {
  actions: {
    complete (task) {
      const duration = 3000;
      task.set('pendingCompletion', true);
      const destination = {
        bottom: 100,
        right: 100,
        width: 100
      };

      const jqSelect = Ember.$('.task-card').filter(
        () => Ember.$(this).data("task-id") == task.get("id")
      );
      const width = jqSelect.width();

      d3.select(jqSelect.get(0))
        .style('position', 'absolute')
        .style('width', `${width}px`)
        .transition()
        .duration(2000)
        .style('width', `${destination.width}px`)
        .style('right', `${destination.right}px`)
        .style('bottom', `${destination.bottom}px`)
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
