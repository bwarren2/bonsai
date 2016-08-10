import Ember from 'ember';
import FilteredTasks from '../mixins/filtered-tasks';

export default Ember.Controller.extend(FilteredTasks, {
  taskGraphData: Ember.computed(
    'filteredTasks.@each.title',
    'filteredTasks.@each.afters',
    function () {
      return this.get('filteredTasks');
    }
  ),

  actions: {
    addAfter (sourceId, targetId) {
      const source = this.get('filteredTasks').findBy('id', sourceId);
      const target = this.get('filteredTasks').findBy('id', targetId);
      source.addAfter(target);
    },

    removeAfter (sourceId, targetId) {
      const source = this.get('filteredTasks').findBy('id', sourceId);
      const target = this.get('filteredTasks').findBy('id', targetId);
      source.removeAfter(target);
    }
  }
});
