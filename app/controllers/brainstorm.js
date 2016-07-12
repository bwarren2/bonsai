import Ember from 'ember';

export default Ember.Controller.extend({
  newTaskTitle: '',

  actions: {
    addTask () {
      const title = this.get('newTaskTitle');
      this.set('newTaskTitle', '');
      this.store.createRecord('task', { title }).save();
    }
  }
});
