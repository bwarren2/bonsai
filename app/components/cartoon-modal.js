import Ember from 'ember';

export default Ember.Component.extend({
  open: false,
  newTaskTitle: "",

  actions: {
    showModal () {
      this.set('open', true);
    },

    hideModal () {
      this.set('open', false);
    }
  }
});
