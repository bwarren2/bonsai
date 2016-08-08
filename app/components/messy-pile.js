import Ember from 'ember';

export default Ember.Component.extend({
  sortProperties: ['created_at:desc'],
  sortedModel: Ember.computed.sort('tasks', 'sortProperties')
});
