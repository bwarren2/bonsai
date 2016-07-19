import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  completed: attr('boolean'),
  befores: hasMany('task', { inverse: 'afters' }),
  afters: hasMany('task', { inverse: 'befores' }),

  // Eventually, this should be "has incomplete befores"
  hasBefores: Ember.computed.notEmpty('befores'),
  hasAfters: Ember.computed.notEmpty('afters'),

  addBefore (task) {
    if (task.get('id') === this.get('id')) {
      return;
    }
    task.get('afters').pushObject(this);
    task.save();
    this.get('befores').pushObject(task);
    this.save();
  },

  addAfter (task) {
    if (task.get('id') === this.get('id')) {
      return;
    }
    task.get('befores').pushObject(this);
    task.save();
    this.get('afters').pushObject(task);
    this.save();
  },

  clearBefores () {
    this.get('befores').then((befores) => {
      befores.forEach((before) => {
        before.get('afters').removeObject(this);
        before.save();
      });
      this.get('befores').removeObjects(befores);
      this.save();
    });
  },

  clearAfters () {
    this.get('afters').then((afters) => {
      afters.forEach((after) => {
        after.get('befores').removeObject(this);
        after.save();
      });
      this.get('afters').removeObjects(afters);
      this.save();
    });
  }
});
