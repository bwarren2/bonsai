import Ember from 'ember';


export default Ember.Component.extend({
  store: Ember.inject.service(),

  open: false,
  newTaskTitle: "",

  actions: {
    showModal () {
      this.set('open', true);
    },

    hideModal () {
      this.set('open', false);
    },

    addTask () {
      const title = this.get('newTaskTitle');
      this.set('newTaskTitle', '');
      if (Boolean(title)) {
        this.get('store').createRecord('task', { title }).save();
      }
      this.set('open', false);
    }
  }
});
