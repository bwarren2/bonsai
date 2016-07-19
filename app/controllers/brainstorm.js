import Ember from 'ember';

export default Ember.Controller.extend({
  newTaskTitle: '',

  sortProperties: ['created:desc'],
  sortedModel: Ember.computed.sort('model', 'sortProperties'),

  actions: {
    addTask () {
      const title = this.get('newTaskTitle');
      this.set('newTaskTitle', '');
      this.store.createRecord('task', { title }).save();
    }
  }
});
