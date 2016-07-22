import Ember from 'ember';

export default Ember.Controller.extend({
  taskGraphData: Ember.computed('model.@each.title', 'model.@each.afters', function () {
    return this.get('model');
  }),

  actions: {
    addAfter (sourceId, targetId) {
      const source = this.get('model').findBy('id', sourceId);
      const target = this.get('model').findBy('id', targetId);
      source.addAfter(target);
    },

    removeAfter (sourceId, targetId) {
      const source = this.get('model').findBy('id', sourceId);
      const target = this.get('model').findBy('id', targetId);
      source.removeAfter(target);
    }
  }
});
