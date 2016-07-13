import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['draggable-dropzone'],
  classNameBindings: ['drag-class'],
  dragClass: 'deactivated',

  dragLeave (event) {
    event.preventDefault();
    this.set('drag-class', 'deactivated');
  },

  dragOver (event) {
    event.preventDefault();
    this.set('drag-class', 'activated');
  },

  drop (event) {
    const target = this.get('target');
    const draggable_data = event.dataTransfer.getData('text/data');
    this.sendAction('dropped', draggable_data, target);
    this.set('drag-class', 'deactivated');    
  }
});
