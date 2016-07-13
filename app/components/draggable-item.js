import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['draggable-item'],
  attributeBindings: ['draggable'],
  draggable: 'true',

  dragStart (event) {
    return event.dataTransfer.setData('text/data', this.get('content'));
  }
});
