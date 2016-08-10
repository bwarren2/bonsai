import Ember from 'ember';

export default Ember.Mixin.create({
  application: Ember.inject.controller(),
  decks: Ember.computed.alias('application.decks'),
  filteredTasks: Ember.computed.alias('application.tasks')
});
