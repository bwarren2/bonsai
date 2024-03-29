import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  taskGraphData: Ember.computed(
    'model.tasks.@each.title',
    'model.tasks.@each.afters',
    function () {
      return this.get('model.tasks');
    }
  ),

  actions: {
    addAfter (sourceId, targetId) {
      const source = this.get('model.tasks').findBy('id', sourceId);
      const target = this.get('model.tasks').findBy('id', targetId);
      source.addAfter(target);
    },

    removeAfter (sourceId, targetId) {
      const source = this.get('model.tasks').findBy('id', sourceId);
      const target = this.get('model.tasks').findBy('id', targetId);
      source.removeAfter(target);
    }
  }
});
