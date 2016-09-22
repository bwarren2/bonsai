import Ember from 'ember';


export default Ember.Component.extend({
  store: Ember.inject.service(),
  showAddTaskModal: Ember.inject.service(),

  open: Ember.computed.alias('showAddTaskModal.taskModalOpen'),

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
      if (title) {
        const attrs = { title };
        this.get('store').createRecord('task', attrs).save();
      }
      this.set('open', false);
    }
  }
});
