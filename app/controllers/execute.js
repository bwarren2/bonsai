// from d3 import 'd3';
import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';

export default Ember.Controller.extend(FilteredTasks, {
  actions: {
    complete (task) {
      task.set('pendingCompletion', true);
      var destination = {
        top:0,
        left:200,
      };

      var jq_select = Ember.$('div.task-card').filter(function() {
        return Ember.$(this).data("task-id") == task.get("id");
      });
      var width = jq_select.width();

      console.log(width);
      d3.select(jq_select.get(0))
      .style('position', 'absolute')
      .style('width', width+"px")
      .transition()
      .duration(2000)
      .style('width', 300+"px")
      .style('left', destination.left+"px")
      .style('top', destination.top+"px")
      .transition()
      .duration(100000)

      // Run later to allow animation to complete.
      // this.$("#test").fadeOut("slow");
      Ember.run.later(this, () => {
        task.set('pendingCompletion', false);
        task.complete();
      }, 10000);
    },

    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    }
  }
});
