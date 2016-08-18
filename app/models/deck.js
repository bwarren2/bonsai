import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  task_set: hasMany('task'),
  deleted_at: attr('date'),
  isActive: Ember.computed('deleted_at', function () {
    return this.get('deleted_at') == null;
  }),
  delete() {
    this.get('task_set').then(function(tasks){
      tasks.forEach(function(t){
        t.delete();
      });
    });
    this.set('deleted_at', new Date());
    this.save();
  }
});

