import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  created_at: attr('date', {
    defaultValue () {
      return new Date();
    }
  }),
  completed_at: attr('date'),
  refined: attr('boolean', {
    defaultValue: false
  }),
  details: attr('string', { defaultValue: "" }),
  befores: hasMany('task', { inverse: 'afters' }),
  afters: hasMany('task', { inverse: 'befores' }),

  // Goofy, but enables templates to correctly render boolean HTML attributes:

  hasAfters: Ember.computed.notEmpty('afters'),

  isCompleted: Ember.computed('completed_at', function () {
    return this.get('completed_at') !== null;
  }),

  notCompleted: Ember.computed.not('isCompleted'),

  inBrainstorm: Ember.computed('refined', 'isCompleted', function () {
    return !this.get('refined') && !this.get('isCompleted');
  }),

  readyForRefine: Ember.computed('refined', 'isCompleted', function () {
    return !this.get('refined') && !this.get('isCompleted');
  }),

  readyToExecute: Ember.computed('isCompleted', 'befores.@each.isCompleted', function () {
    return this.get('befores').then((befores) => {
      const ret = befores.filter(
        (before) => !before.get('isCompleted')
      ).length === 0;
      return ret && !this.get('isCompleted');
    });
  }),

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

  removeBefore (task) {
    task.get('afters').removeObject(this);
    task.save();
    this.get('befores').removeObject(task);
    this.save();
  },

  removeAfter (task) {
    task.get('befores').removeObject(this);
    task.save();
    this.get('afters').removeObject(task);
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
  },

  complete () {
    this.set('completed_at', new Date());
    this.save();
  },

  uncomplete () {
    this.set('completed_at', null);
    this.save();
  }
});
