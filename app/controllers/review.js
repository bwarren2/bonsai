import Ember from 'ember';
import _ from 'lodash/lodash';
import { datestring } from 'bonsai/helpers/datestring';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  completedTasks: Ember.computed('model.tasks', function () {
    return this.get('model.tasks').filter((task) => {
      return task.get("isCompleted");
    });
  }),

  countData: Ember.computed('completedTasks.@each.completed_at', function () {
    const min_date = new Date();
    min_date.setDate(min_date.getDate() - 14);
    const counts = _.countBy(
      this.get('completedTasks').filter((d) => {
        return d.get('completed_at') !== null && d.get('completed_at') >= min_date;
      }).map((d) => {
        return datestring([d.get('completed_at')]);
      })
    );
    if (Object.keys(counts).length === 0) {
      return 0;
    }
    return Object.keys(counts).map((key) => {
      return {
        label: key,
        value: counts[key]
      };
    });
  }),

  actions: {
    reject (task) {
      task.uncomplete();
    },

    approve (task) {
      task.approve();
    },

    focusTask (task) {
      const focused = task.get('focused');
      task.set('focused', !focused);
    }
  }
});
