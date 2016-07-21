import Ember from 'ember';

export default Ember.Controller.extend({
  sortedFilteredModel: Ember.computed('model.@each.refined', function () {
    return this.get('model').sortBy('created:desc').filter((task) => {
      return !task.get('refined');
    });
  }),

  activeTask: Ember.computed('sortedFilteredModel', function () {
    return this.get('sortedFilteredModel')[0];
  }),

  inactiveTasks: Ember.computed('sortedFilteredModel', function () {
    return this.get('sortedFilteredModel').slice(1);
  }),

  actions: {
    do: function (task) {
      task.set('refined', true);
      task.save();
    },

    defer: function (task) {
      task.set('refined', true);
      task.save();
    },

    delegate: function (task) {
      task.set('refined', true);
      task.save();
    },

    destroy: function (task) {
      task.set('refined', true);
      task.save();
    }
  }
});
