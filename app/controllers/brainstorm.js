import Ember from 'ember';

export default Ember.Controller.extend({
  newTaskTitle: '',

  sortProperties: ['created:desc'],
  sortedModel: Ember.computed.sort('model', 'sortProperties'),

  actions: {
    addTask () {
      const title = this.get('newTaskTitle');
      this.set('newTaskTitle', '');
      if (Boolean(title)) {
        this.store.createRecord('task', { title }).save();
      }
    },

    refineWith (task) {
      this.transitionToRoute('refine', {
        queryParams: {
          task: task.get('id')
        }
      });
    }
  }
});
