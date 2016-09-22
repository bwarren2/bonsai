import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  newTaskTitle: '',

  actions: {
    addTask () {
      const title = this.get('newTaskTitle');
      this.set('newTaskTitle', '');
      if (title) {
        const attrs = { title };
        this.store.createRecord('task', attrs).save();
      }
    }
  }
});
