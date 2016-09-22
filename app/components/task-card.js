import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['taskCard', 'well', 'clickable', 'focused'],
  taskCard: 'task-card',
  well: 'well',
  clickable: Ember.computed.notEmpty('action'),
  focused: Ember.computed.alias('task.focused'),

  attributeBindings: ['style:style'],
  style: Ember.computed('index', function () {
    const index = this.get('index');
    if (Number.isInteger(index)) {
      return `z-index: ${1000 - index}`;
    }
    return '';
  }),

  click () {
    const task = this.get('task');
    const action = this.get('action');
    if (action) {
      action(task);
    }
  }
});
