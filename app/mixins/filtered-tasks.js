import Ember from 'ember';

export default Ember.Mixin.create({
  application: Ember.inject.controller(),
  filteredTasks: Ember.computed.alias('application.tasks')
});
