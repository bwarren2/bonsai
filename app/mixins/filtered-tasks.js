import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service(),

  filteredAllTasks: Ember.computed(
    'model.tasks',
    function () {
      return this.get('model.tasks');
    }
  ),

  filteredTasks: Ember.computed(
    'model.tasks',
    function () {
      return this.get('model.tasks').filter((task) => {
        return task.get("notCompleted");
      });
    }
  ),
  completedTasks: Ember.computed(
    'model.tasks',
    function () {
      return this.get('model.tasks').filter((task) => {
        return task.get("isCompleted");
      });
    }

  ),
  tasks: Ember.computed.alias('model.tasks')
});
